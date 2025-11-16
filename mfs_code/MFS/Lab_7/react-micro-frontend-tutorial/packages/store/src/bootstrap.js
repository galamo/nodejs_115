// bootstrap.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Mount function to start up the app
const mount = (el) => {
  const root = createRoot(el);
  root.render(<App />);
};
// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_store-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
