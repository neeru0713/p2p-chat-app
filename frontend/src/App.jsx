import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import SignUp from './components/SignUp'
import ChatPage from './components/chat/ChatPage';


function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/chatpage" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App
