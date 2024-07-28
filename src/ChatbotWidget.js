import React from 'react';
import ReactDOM from 'react-dom';
import ChatWidget from './components/ChatWidget';

class ChatbotWidget {
  static init(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
      ReactDOM.render(<ChatWidget />, container);
    }
  }
}

export default ChatbotWidget;