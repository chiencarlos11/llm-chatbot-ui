import React from 'react';
import chatbotLogo from '../assets/chatbot.png';

function MinimizedChat({ onClick }) {
  return (
    <div className="minimized-chat" onClick={onClick}>
      <img src={chatbotLogo} alt="Chat Logo" className="chat-logo" />
    </div>
  );
}

export default MinimizedChat;