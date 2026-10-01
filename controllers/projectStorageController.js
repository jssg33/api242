// Ensures that a project's storage backend (a GitHub repo or an Azure Storage
// account/container) has the expected project folders (e.g. "docs") and
// creates any that are missing with a placeholder readme.txt.
//
// Requires server-side credentials set as environment variables — never put
// these in frontend code:
//   GITHUB_TOKEN                     - a GitHub personal access token with
//                                      "repo" (contents: write) scope
//   AZURE_STORAGE_CONNECTION_STRING  - an Azure Storage account connection
//                                      string with write access
//
// npm install needed for Azure support: @azure/storage-blob

const DEFAULT_DIRECTORIES = ["docs"];
const README_CONTENT =
  "This directory was automatically created by Fusion Project Manager.\n";

function parseGithubRepo(repoUrl) {
  if (!repoUrl) return null;
  // Accepts forms like:
  //   https://github.com/owner/repo
  //   https://github.com/owner/repo.git
  //   https://github.com/owner/repo/tree/main
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?(?:\/.*)?$/i);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}

async function githubCheckDirectory(owner, repo, dir, token) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(dir)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    }
  );
  if (res.status === 200) return true;
  if (res.status === 404) return false;
  const body = await res.text();
  throw new Error(`GitHub check failed for "${dir}" (${res.status}): ${body}`);
}

async function githubCreateReadme(owner, repo, dir, token) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(dir)}/readme.txt`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Create ${dir} directory`,
        content: Buffer.from(README_CONTENT, "utf8").toString("base64"),
      }),
    }
  );
  if (res.status !== 201 && res.status !== 200) {
    const body = await res.text();
    throw new Error(`GitHub create failed for "${dir}" (${res.status}): ${body}`);
  }
}

async function ensureGithubDirectories(repoUrl, directories) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not configured on the server");

  const parsed = parseGithubRepo(repoUrl);
  if (!parsed) throw new Error(`Could not parse a GitHub owner/repo from "${repoUrl}"`);

  const results = [];
  for (const dir of directories) {
    const exists = await githubCheckDirectory(parsed.owner, parsed.repo, dir, token);
    if (exists) {
      results.push({ directory: dir, status: "exists" });
    } else {
      await githubCreateReadme(parsed.owner, parsed.repo, dir, token);
      results.push({ directory: dir, status: "created", file: `${dir}/readme.txt` });
    }
  }
  return results;
}

function parseAzureDirectory(value) {
  // Expected form: "<account>/<container>/<optional/path>"
  // The account segment is informational only — the actual account used is
  // whichever one AZURE_STORAGE_CONNECTION_STRING points to.
  if (!value) return null;
  const parts = value.split("/").filter(Boolean);
  if (parts.length < 2) return null;
  const [, container, ...rest] = parts;
  return { container, basePath: rest.join("/") };
}

async function ensureAzureDirectories(azureDirectory, directories) {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!connectionString) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING is not configured on the server");
  }

  const parsed = parseAzureDirectory(azureDirectory);
  if (!parsed) {
    throw new Error(
      `Could not parse an Azure container/path from "${azureDirectory}" (expected "account/container/path")`
    );
  }

  const { BlobServiceClient } = require("@azure/storage-blob");
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(parsed.container);
  await containerClient.createIfNotExists();

  const results = [];
  for (const dir of directories) {
    const prefix = parsed.basePath ? `${parsed.basePath}/${dir}/` : `${dir}/`;
    let exists = false;
    for await (const _blob of containerClient.listBlobsFlat({ prefix })) {
      exists = true;
      break;
    }
    if (exists) {
      results.push({ directory: dir, status: "exists" });
    } else {
      const blobPath = `${prefix}readme.txt`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobPath);
      await blockBlobClient.upload(README_CONTENT, Buffer.byteLength(README_CONTENT));
      results.push({ directory: dir, status: "created", file: blobPath });
    }
  }
  return results;
}

exports.ensureDirectories = async (req, res) => {
  try {
    const {
      storageProvider,
      repoUrl,
      azureDirectory,
      directories,
    } = req.body;

    const dirs =
      Array.isArray(directories) && directories.length > 0
        ? directories
        : DEFAULT_DIRECTORIES;

    let results;
    if (storageProvider === "azure") {
      results = await ensureAzureDirectories(azureDirectory, dirs);
    } else if (storageProvider === "github") {
      results = await ensureGithubDirectories(repoUrl, dirs);
    } else {
      return res.status(400).json({ error: 'storageProvider must be "github" or "azure"' });
    }

    res.json({ storageProvider, results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
