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
tshark -r sample.pcap -T json
Place your .pcap file in the project folder and update PCAP_FILE path in server.js.

⚡ Live Mode

Capture packets in real time from a network interface (requires Wireshark installed and permission):sudo tshark -i wlan0 -T json
🖥️ Frontend Visualization

Built with HTML, CSS, and JavaScript

Charts powered by Chart.js

Real-time communication with backend via Socket.io

Key visual components:

Recent Packets Table: shows time, source → destination, protocol, and length

Throughput Chart: bytes/second line graph (last 30 seconds)

Protocol Distribution: dynamic pie chart showing packet types

Stats: packet count, total bytes, packets per second

🧠 How It Works

The server runs a packet source (fake generator or tshark).

Packet objects are sent via Socket.io to the browser.

The frontend updates charts and tables in real time.

🧩 Future Improvements

Add filters (by protocol, IP range, or time)

Store history in a database (MongoDB or SQLite)

Implement authentication for multi-user dashboards

GeoIP lookup for external traffic sources

Dark/light theme switcher

🧰 Requirements

Node.js (v16 or newer)

npm (comes with Node.js)

Wireshark / tshark
 if using real data

📸 Preview

(add a screenshot or GIF of your dashboard here)

📜 License

This project is licensed under the MIT License
.

👨‍💻 Author

Your Name
GitHub Profile
