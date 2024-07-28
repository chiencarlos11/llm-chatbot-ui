import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

function MessageList({ messages }) {
  // Function to detect and format code
  const formatMessage = (text) => {
    // More comprehensive regex to detect code-like content
    const codeRegex = /^(const|let|var|function|import|class|if|for|while|switch|case|return|async|await)[\s\S]*?$/m;
    
    if (codeRegex.test(text)) {
      // If code is detected, wrap it in a code block
      return (
        <pre>
          <code className="language-javascript">
            {text}
          </code>
        </pre>
      );
    } else {
      // If it's not code, split by newlines and create separate spans
      return text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.sender}`}>
          {message.sender === 'bot' && <span className="bot-name">Helios Assist: </span>}
          {formatMessage(message.text)}
        </div>
      ))}
    </div>
  );
}

export default MessageList;