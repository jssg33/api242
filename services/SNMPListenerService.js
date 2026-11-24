// services/SNMPListenerService.js
// Node port of the G4's SNMPListenerService (SERVICE-SNMP-LISTENER/snmplistener.cs), option 2 (toggle).
// Like the C# version it opens UDP listeners on ports 160 and 161 and logs each packet's source.
//
// Notes for this host:
//   - Ports below 1024 usually need root. Override with SNMP_PORTS (e.g. "1160,1161").
//   - Render web services only route HTTP, so packets from outside will not reach these sockets there.
//   A port that fails to bind is reported in the start() result instead of crashing the API.

const dgram = require("dgram");

const PORTS = (process.env.SNMP_PORTS || "160,161")
  .split(",")
  .map((p) => parseInt(p.trim(), 10))
  .filter((p) => p > 0 && p < 65536);

let sockets = [];
let running = false;

function isRunning() {
  return running;
}

function bind(port) {
  return new Promise((resolve) => {
    const socket = dgram.createSocket("udp4");

    socket.on("message", (msg, rinfo) => {
      console.log(`SNMP Packet Received From ${rinfo.address} on port ${port} (${msg.length} bytes)`);
    });

    let bound = false;

    // Keep an error listener for the socket's whole life: an unhandled 'error' on a dgram socket crashes Node.
    socket.on("error", (err) => {
      if (!bound) {
        socket.close();
        resolve({ port, listening: false, error: err.message });
        return;
      }
      console.error(`SNMP listener on port ${port}: ${err.message}`);
    });

    socket.bind(port, () => {
      bound = true;
      sockets.push(socket);
      resolve({ port, listening: true });
    });
  });
}

async function start() {
  if (running) {
    return { running: true, ports: PORTS.map((port) => ({ port, listening: true })), message: "SNMP Listener already running." };
  }

  const ports = await Promise.all(PORTS.map(bind));
  running = ports.some((p) => p.listening);
  console.log(running ? "SNMP Listener Started." : "SNMP Listener could not bind any port.");
  return { running, ports };
}

async function stop() {
  if (!running) return { running: false, message: "SNMP Listener already stopped." };

  await Promise.all(sockets.map((s) => new Promise((resolve) => s.close(resolve))));
  sockets = [];
  running = false;
  console.log("SNMP Listener Stopped.");
  return { running: false };
}

module.exports = { isRunning, start, stop };
