import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import chatbotLogo from '../assets/chatbot.png';
// Import more language components as needed

function ExpandedChat({ onClose }) {
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState(() => {
    // Load messages from local storage on initial render
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [
      { text: "Hi I'm Tico! 👋 Voiceflow's marketing website AI agent.", sender: 'bot' },
      { text: "Welcome to Voiceflow! 🚀 Empower your team to create AI agents that transform and scale your business! 👍", sender: 'bot' }
    ];
  });
  const [input, setInput] = useState('');

  // Save messages to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const detectAndFormatCode = (text) => {
    const codeRegex = /```(\w+)?\s*([\s\S]*?)```/g;
    let formattedText = text;
    let match;

    while ((match = codeRegex.exec(text)) !== null) {
      const language = match[1] || 'javascript';
      const code = match[2].trim();
      const highlightedCode = Prism.highlight(code, Prism.languages[language], language);
      formattedText = formattedText.replace(match[0], `<pre><code class="language-${language}">${highlightedCode}</code></pre>`);
    }

    return formattedText;
  };

  const handleSend = () => {
    if (input.trim()) {
      const formattedInput = detectAndFormatCode(input);
      setMessages(prevMessages => [...prevMessages, { text: formattedInput, sender: 'user' }]);
      setInput('');
      // Here you would typically call your AI service to get a response
      // For now, we'll just echo the message back
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: `You said: ${formattedInput}`, sender: 'bot' }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [messages]);

  const clearConversation = () => {
    setMessages([
      { text: "Hi I'm Helios Assist! 👋", sender: 'bot' },
      ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  return (
    <div className="expanded-chat">
      <div className="chat-header">
        <div className="chat-header-left">
          <img src={chatbotLogo} alt="Assistant" className="chat-logo" />
          <span>Assistant</span>
          <button onClick={clearConversation} className="clear-button">Clear</button>
        </div>
        <button onClick={onClose} className="close-button">✕</button>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <div dangerouslySetInnerHTML={{ __html: message.text }} />
            {message.sender === 'bot' && (
              <div className="feedback">
                Was this helpful? <button>👍</button> <button>👎</button>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* This empty div is our scroll anchor */}
      </div>
      <div className="quick-replies">
        <button onClick={() => handleSend("Debug a Build")}>Debug a Build</button>
        <button onClick={() => handleSend("Open a Ticket")}>Open a Ticket</button>
        </div>
      <div className="chat-input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Message... (Use ``` for code blocks)"
          rows="3"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ExpandedChat;