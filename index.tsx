import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import App from './App';
import axios from 'axios';
import { LandingPage } from './src/Landing';

axios.defaults.baseURL = 'https://api-gilt-one.vercel.app/';

export default function AppRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/editor" element={<App />} />
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<AppRoute />);
