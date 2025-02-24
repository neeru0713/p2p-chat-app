# Peer-to-Peer Chat Messaging Application

## Overview
This is a peer-to-peer (P2P) chat application that enables two users to communicate directly. The application supports real-time messaging, user authentication, online status indicators, and temporary message storage for offline users.

## Features
- **Sign Up:** Users must register using an email and mobile number.
- **Sign In:** Users can login using an email and password.
- **Direct Messaging:** Users can search for others via email or mobile number and initiate chats.
- **Real-Time Messaging:** Messages are sent and received instantly through WebSockets.
- **Offline Message Storage:** Messages sent to offline users are stored in mongodb and delivered when they come online.
- **Online Status Indicator:** A green badge indicates when a user is online.


---
## Technologies Used
### Backend:
- **Node.js** – Runtime environment
- **Express.js** – Backend framework
- **MongoDB & Mongoose** – Database and ORM
- **Socket.io** – Real-time messaging
- **bcrypt.js** – Password hashing
- **jsonwebtoken (JWT)** – Authentication

### Frontend:
- **React.js** – User Interface
- **Tailwind CSS** – Styling
- **Socket.io Client** – Real-time communication

---
## Installation and Setup
### Prerequisites
- **Node.js (v16 or later)**
- **MongoDB (local or cloud instance)**

### Steps to Run the Application
#### 1. Clone the Repository
```bash
git clone https://github.com/neeru0713/p2p-chat-app.git
cd p2p-chat-app
```

#### 2. Install Dependencies
##### Backend:
```bash
cd backend
npm install
```
##### Frontend:
```bash
cd ../frontend
npm install
```

#### 3. Set Up Environment Variables
Create a `.env` file in the `backend` directory and add:
```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

#### 4. Start the Application
##### Start the Backend Server:
```bash
cd backend
npm run start
```
##### Start the Frontend:
```bash
cd ../frontend
npm run dev
```

The backend runs on `http://localhost:8080`, and the frontend runs on `http://localhost:5173`.

---
## API Endpoints
### Authentication
- **POST /api/auth/signup** – Register a new user
- **POST /api/auth/signin** – Authenticate user and get a JWT token

### Chats
- **GET /api/chat/search** – Fetch users based on search query
- **GET /api/chat** – Fetch all the chats of loggedin user
- **POST /api/chat** – Create a new chat

### Messages
- **GET /api/chat/:chatId/messages/** – Get messages for a chat

---
## WebSocket Events
- **connect** – User connects to the chat
- **disconnect** – User disconnects from the chat
- **sendMessage** – Send a message
- **receiveMessage** – Receive a new message

---
## Dependencies
### Backend:
- `express`
- `mongoose`
- `socket.io`
- `jsonwebtoken`
- `bcryptjs`
- `dotenv`
- `cors`

### Frontend:
- `react`
- `react-router-dom`
- `react-icons`
- `socket.io-client`
- `tailwindcss`

---
## Demo


---


## Future Enhancements
- Implementing file sharing
- Improving the UI/UX
- Adding support for group chats

