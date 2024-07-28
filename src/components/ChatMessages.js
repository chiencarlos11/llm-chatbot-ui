import React from 'react';

function ChatMessages({ messages }) {
  return (
    <div className="chat-messages">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.sender}`}>
          {message.text}
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;