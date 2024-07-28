# Chatbot Widget

This is a customizable chatbot widget that can be easily integrated into any React application as an iframe.

## Installation

1. Include the chatbot library in your project:

   ```html
   <script src="https://path-to-your-hosted-library/chatbot-widget.js"></script>
   ```

Replace https://path-to-your-hosted-library/chatbot-widget.js with the actual URL where your chatbot library is hosted.

2. Make sure you have React and ReactDOM included in your project:

```
<script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
```

Usage
As an iframe
To use the chatbot as an iframe in your React application:

Create an HTML file (e.g., chatbot.html) that initializes the chatbot:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatbot Widget</title>
    <script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
    <script src="https://path-to-your-hosted-library/chatbot-widget.js"></script>
</head>
<body>
    <div id="chatbot-container"></div>
    <script>
        ChatbotWidget.init('chatbot-container');
    </script>
</body>
</html>
```

2. Host this HTML file on a server or CDN.

3. In your React application, embed the chatbot using an iframe:

```
function App() {
  return (
    <div>
      <h1>My React App</h1>
      <iframe 
        src="https://your-hosted-chatbot-url/chatbot.html" 
        width="400" 
        height="600" 
        frameBorder="0"
        title="Chatbot"
      ></iframe>
    </div>
  );
}
```

Replace https://your-hosted-chatbot-url/chatbot.html with the actual URL where you've hosted the chatbot HTML file.

Customization
You can customize the appearance of the chatbot by modifying the CSS in the chatbot library. If you need to pass custom configurations, you can extend the ChatbotWidget.init() function to accept parameters.
Development
If you want to modify the chatbot widget:

Clone this repository
Install dependencies: npm install
Make your changes in the src directory
Build the library: npm run build
The built library will be in the dist directory
