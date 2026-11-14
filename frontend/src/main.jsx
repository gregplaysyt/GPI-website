import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles.css';

// The site is served from a sub-path on GitHub Pages (/GPI-website/), which
// Vite exposes as BASE_URL. In local dev BASE_URL is "/", so no basename is
// used and existing URLs keep working.
const trimmed = import.meta.env.BASE_URL.replace(/\/$/, '');
const basename = trimmed === '' ? undefined : trimmed;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
