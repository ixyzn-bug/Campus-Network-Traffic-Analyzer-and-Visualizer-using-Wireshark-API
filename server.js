const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { spawn } = require('child_process');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const MODE = 'pcap'; // 'pcap' for sample file, 'live' for real interface
const PCAP_FILE = './sample.pcap'; // replace with your file name

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.emit('meta', { msg: 'Connected to Traffic Analyzer' });
});

// --- Simulated packets (fallback) ---
const PROTOCOLS = ['TCP', 'UDP', 'ICMP', 'HTTP', 'HTTPS', 'DNS', 'ARP'];
function randomIp() {
  return `${Math.floor(Math.random()*223)+1}.${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}`;
}
function createFakePacket() {
  const proto = PROTOCOLS[Math.floor(Math.random()*PROTOCOLS.length)];
  return {
    ts: Date.now(),
    src: randomIp(),
    dst: randomIp(),
    len: Math.floor(Math.random()*1400) + 60,
    proto
  };
}

function sendFakePackets() {
  setInterval(() => {
    io.emit('packet', createFakePacket());
  }, 300);
}

// --- Real tshark integration for PCAP mode ---
function runTsharkPcap() {
  if (!fs.existsSync(PCAP_FILE)) {
    console.error('No PCAP file found, switching to simulator.');
    sendFakePackets();
    return;
  }

  const tshark = spawn('tshark', ['-r', PCAP_FILE, '-T', 'json']);
  let buffer = '';

  tshark.stdout.on('data', (data) => {
    buffer += data.toString();
    try {
      const json = JSON.parse(buffer);
      json.forEach(pkt => {
        const proto = pkt._source?.layers?._ws?.['ws.col.Protocol'] || 'UNKNOWN';
        const len = parseInt(pkt._source?.layers?.frame?.['frame.len']) || 0;
        io.emit('packet', {
          ts: Date.now(),
          src: 'unknown',
          dst: 'unknown',
          proto,
          len
        });
      });
      buffer = '';
    } catch (err) {
      // wait for full JSON
    }
  });

  tshark.stderr.on('data', (d) => console.error('tshark error:', d.toString()));
  tshark.on('close', () => console.log('tshark finished reading pcap'));
}

MODE === 'pcap' ? runTsharkPcap() : sendFakePackets();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
