import React from 'react'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import ChatPage from './components/chat/ChatPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App
