🕒 SlotSwapper

SlotSwapper is a full-stack web application that allows users to create, view, and swap scheduled slots with others.
It features secure user authentication, event management, and an intuitive frontend interface powered by React + Vite.

🚀 Features

✅ JWT Authentication — Secure login/signup with bcrypt password hashing
✅ Event Management — Create and view personal time slots
✅ Slot Swapping — Request, approve, or reject swap requests
✅ Full-Stack Integration — Node.js backend + React frontend
✅ JSON-based Mock Database for development

🧱 Tech Stack
Layer	Technology
Frontend	React, Vite, TailwindCSS
Backend	Node.js, Express.js
Authentication	JWT, bcrypt
Database	JSON files
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
GET	/api/events	Fetch all events
POST	/api/events	Create new event
POST	/api/swaps/request	Request a slot swap
POST	/api/swaps/accept	Accept a swap request
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

📸 Screenshots of UI
✅ Login Page

✅ Dashboard

🧑‍💻 Developer

👤 Author: Priyanshu Raj
💻 Project: SlotSwapper (Full-Stack Application)
📬 Contact: Available on GitHub

🛠️ Future Improvements

🔗 Move from JSON storage → MongoDB/PostgreSQL

🌍 Deploy Backend (Render/Railway) & Frontend (Vercel)

📆 Add drag & drop calendar UI

🔔 Add real-time notifications

📄 License

This project is licensed under the MIT License — you may freely use and modify it.

🌟 Show Your Support

If you like this project, give it a ⭐ on GitHub!
