import './main.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

export const initAPIMock = async () => {
  const { worker } = await import("./server/worker.js")
  await worker.start({
    onUnhandledRequest: "bypass",
  })
}

const initApplication = async () => {
  await initAPIMock()
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

initApplication()
