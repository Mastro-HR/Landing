import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';
import './styles/globals.css';
import App from './App';

ReactGA.initialize('G-1FMCKZ1F48');

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);