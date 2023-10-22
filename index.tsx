import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'https://api-gilt-one.vercel.app/';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
