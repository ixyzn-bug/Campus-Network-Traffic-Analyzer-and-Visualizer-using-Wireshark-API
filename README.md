# Campus Network Traffic Analyzer and Visualizer using Wireshark API

A simple **web-based network traffic analyzer and visualizer** that displays live or recorded (pcap) packet data using **Node.js**, **Socket.io**, and **Chart.js**.  
Built as a learning and demo project for exploring how Wireshark's `tshark` API can feed live network statistics into a browser dashboard.

---

## 🚀 Features
- Real-time packet visualization (source, destination, protocol, size)
- Throughput chart (bytes per second)
- Protocol distribution (pie chart)
- Live statistics (total packets, total bytes, packets/sec)
- Works with both:
  - **Simulated data** (default)
  - **Real `.pcap` files** parsed using `tshark`

---

## 🗂️ Project Structure
Campus-Network-Traffic-Analyzer/
│
├── package.json
├── server.js
├── sample.pcap # optional - add your Wireshark capture here
└── public/
├── index.html
├── style.css
└── script.js



---

## ⚙️ Installation & Setup

### 1️⃣ Install dependencies
```bash
npm install
2️⃣ Run the server
node server.js
Server runs by default at:
👉 http://localhost:3000💡 Modes of Operation

You can switch modes in server.js:const MODE = 'pcap'; // or 'live'
🧩 PCAP Mode

Use a saved Wireshark capture file (no admin rights needed):
