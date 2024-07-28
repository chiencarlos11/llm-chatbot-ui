import React, { useState } from 'react';

function InputArea({ onSendMessage }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage({ text: input, sender: 'user' });
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-area">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message... (Shift + Enter for new line)"
        rows="3"
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default InputArea;