import './index.css';
import React from 'react';
import App from "./components/App/App";
import ReactDOM from 'react-dom/client';
require('dotenv').config({path:__dirname+'/../../.env'});

export const DOMAIN = "http://localhost:3000";
export const NO_IMAGES = 9; //There are 9 static images from which teh user can choose.
export const JWT_SECRET = process.env.JWT_SECRET; // Export jwt secret key.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
