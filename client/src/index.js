import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./components/App/App";

export const DOMAIN = "http://localhost:3000";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
