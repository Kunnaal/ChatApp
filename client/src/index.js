import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./components/App/App";

export const DOMAIN = "http://localhost:3000";
export const NO_IMAGES = 9; //There are 9 static images from which teh user can choose.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
