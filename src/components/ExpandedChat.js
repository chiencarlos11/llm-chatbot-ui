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
    console.log("inside the format function = " + text)
    const codeRegex = /```(\w+)?\s*([\s\S]*?)```/g;
    let formattedText = text;
    let match;

    while ((match = codeRegex.exec(text)) !== null) {
      const language = match[1] || 'javascript';
      const code = match[2].trim();
      const highlightedCode = Prism.highlight(code, Prism.languages[language], language);
      formattedText = formattedText.replace(match[0], `<pre><code class="language-${language}">${highlightedCode}</code></pre>`);
    }

    console.log("after processing format function = " + text)
    return formattedText;
  };

  const handleSend = async () => {
    if (input.trim()) {
      const formattedInput = detectAndFormatCode(input);
      setMessages(prevMessages => [...prevMessages, { text: formattedInput, sender: 'user' }]);
      setInput('');
  
      try {
        const response = await fetch('http://localhost:3001/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            messages: [{ role: "user", content: input }] // Use original input here, not formattedInput
          }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        const formattedReply = detectAndFormatCode(data['choices'][0]['message']['content']);
        setMessages(prevMessages => [...prevMessages, { text: formattedReply, sender: 'bot' }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prevMessages => [...prevMessages, { text: 'Sorry, there was an error processing your request.', sender: 'bot' }]);
      }
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