import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login.tsx';
import Chat from './components/chat/Chat.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/chat" element={<Chat />}/>
        <Route path="/" element={<Login />}/>
      </Routes>
    </Router>
  )
}

export default App;