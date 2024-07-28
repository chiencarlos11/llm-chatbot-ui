import React, { useState, useEffect } from 'react';
import MinimizedChat from './MinimizedChat';
import ExpandedChat from './ExpandedChat';
import '../ChatWidget.css';

function ChatWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.8
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleChat = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`chat-widget ${isExpanded ? 'expanded' : ''}`}
      style={isExpanded ? {
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`
      } : {}}
    >
      {isExpanded ? (
        <ExpandedChat onClose={toggleChat} />
      ) : (
        <MinimizedChat onClick={toggleChat} />
      )}
    </div>
  );
}

export default ChatWidget;