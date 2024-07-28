import React from 'react';
import ReactDOM from 'react-dom';
import ChatWidget from './components/ChatWidget';

export class ChatbotWidget {
  static init(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
      ReactDOM.render(<ChatWidget />, container);
    }
  }
}