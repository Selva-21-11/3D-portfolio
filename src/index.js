import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client
import './styles/App.css';
import App from './App';

// Create a root element and render the App
const root = ReactDOM.createRoot(document.getElementById('root')); // Create root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
