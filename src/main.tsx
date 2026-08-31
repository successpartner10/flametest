import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register PWA Service Worker
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (reg) => console.log('[PWA] Service Worker registered:', reg.scope),
      (err) => console.log('[PWA] Service Worker registration failed:', err)
    );
  });
} else if ('serviceWorker' in navigator) {
  // Always register in dev mode too so PWA can be tested locally
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (reg) => console.log('[PWA Dev] Service Worker registered:', reg.scope),
      (err) => console.log('[PWA Dev] Service Worker registration failed:', err)
    );
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

