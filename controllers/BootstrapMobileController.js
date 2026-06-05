import BootstrapMobile from "../models/BootstrapMobile.js";

/**
 * GET the single bootstrapmobile record
 */
export const getBootstrapConfig = async (req, res) => {
  try {
    const record = await BootstrapMobile.findOne();

    if (!record) {
      return res.status(404).json({
        message: "BootstrapMobile configuration not found"
      });
    }

    res.json(record);
  } catch (err) {
    console.error("Error fetching bootstrapmobile config:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * UPDATE the single bootstrapmobile record
 */
export const updateBootstrapConfig = async (req, res) => {
  try {
    const updated = await BootstrapMobile.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true // ensures the record exists
    });

    res.json(updated);
  } catch (err) {
    console.error("Error updating bootstrapmobile config:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * SEED default test values for luna.capitoltechnology.net
 */
export const seedBootstrapConfig = async (req, res) => {
  try {
    const defaults = {
      loginServer1: "172.20.10.11",
      loginServer2: "172.20.10.12",
      loginServer3: "172.20.10.13",

      registrationServer1: "172.20.20.11",
      registrationServer2: "172.20.20.12",
      registrationServer3: "172.20.20.13",

      loginCipherOffset: "128",
      restCipherOffset: "256",
      cipherDefaultAlgorithm: "AES-256-GCM",

      defaultDomainName: "luna.capitoltechnology.net",
      dnsServers: [
        "dns1.capitoltechnology.net",
        "dns2.capitoltechnology.net",
        "dns3.capitoltechnology.net"
      ],

      instanceId: "luna-test-001",
      instanceName: "luna-mobile-bootstrap",
      customerName: "Capitol Technology University",
      customerId: "ctu-test-001",
      region: "us-east-test"
    };

    const record = await BootstrapMobile.findOneAndUpdate({}, defaults, {
      new: true,
      upsert: true
    });

    res.json({
      message: "BootstrapMobile test configuration seeded",
      record
    });
  } catch (err) {
    console.error("Error seeding bootstrapmobile config:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
