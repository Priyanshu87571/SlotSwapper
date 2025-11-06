🕒 SlotSwapper

SlotSwapper is a full-stack web application that allows users to create, view, and swap scheduled slots with others.
It features secure user authentication, event management, and an intuitive frontend interface powered by React + Vite.

🚀 Features

🔐 JWT Authentication — Secure login/signup with bcrypt password hashing.

📅 Event Management — Create and view personal time slots or events.

🔁 Slot Swapping — Request, approve, or reject slot swaps.

⚙️ Full-Stack Integration — Seamless connection between Node.js backend and React frontend.

💾 JSON-based Mock Database — Lightweight data persistence for local development.

🧱 Tech Stack
Layer	Technology
Frontend	React, Vite, TailwindCSS
Backend	Node.js, Express.js
Authentication	JWT, bcrypt
Database	JSON files (users.json, events.json, swap_requests.json)
Version Control	Git & GitHub
⚙️ Setup Instructions (Local Development)
1️⃣ Clone the Repository
git clone https://github.com/Priyanshu87571/SlotSwapper.git
cd SlotSwapper/slotswap

2️⃣ Backend Setup
cd backend
npm install
npm run dev


✅ Runs on http://localhost:4001

3️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev


✅ Runs on http://localhost:5173

🔑 API Endpoints
Method	Endpoint	Description
POST	/api/auth/signup	Register new user
POST	/api/auth/login	Login existing user
GET	/api/events	Get all events
POST	/api/events	Create new event
POST	/api/swaps/request	Send swap request
POST	/api/swaps/accept	Accept swap request
📁 Folder Structure
slotswap/
│
├── backend/
│   ├── index.js
│   ├── users.json
│   ├── events.json
│   ├── swap_requests.json
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   └── pages/
│   ├── vite.config.js
│   └── package.json
│
└── README.md

📸 Screenshots (Optional)

Add screenshots of your UI in a screenshots/ folder and link them here:

![Login Page](screenshots/login.png)
![Dashboard](screenshots/dashboard.png)

🧑‍💻 Developer

👤 Author: Priyanshu Raj

💻 Project: SlotSwapper (Full-Stack MERN-Style Application)
📬 Contact: Available on GitHub

🛠️ Future Improvements

🔗 Migrate from JSON files to MongoDB or PostgreSQL

🌍 Deploy Backend (Render / Railway) and Frontend (Vercel)

📆 Add calendar drag & drop functionality

🔔 Add real-time notifications for swap requests

📄 License

This project is licensed under the MIT License — feel free to use and modify it.

🌟 Show Your Support

If you like this project, give it a ⭐ on GitHub to support future improvements!

🔗 Repository Link

👉 SlotSwapper GitHub Repository
