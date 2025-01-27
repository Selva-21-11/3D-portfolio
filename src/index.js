import React from 'react';
import ReactDOM from 'react-dom/client'; // Update this import for React 18+
import './styles/App.css';
import App from './App';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app using the new React 18 method
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
