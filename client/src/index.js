import './index.css';
import React from 'react';
import App from "./components/App/App";
import ReactDOM from 'react-dom/client';

export const DOMAIN = "http://localhost:3000";
export const BACKEND_DOMAIN = "http://localhost:8000";
export const NO_IMAGES = 9; //There are 9 static images from which teh user can choose.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
