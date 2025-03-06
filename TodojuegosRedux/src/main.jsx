import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Importa Provider
import './index.css';
import App from './App.jsx';
import store from './store'; // Importa tu store

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Envuelve tu aplicación con el Provider */}
      <App />
    </Provider>
  </StrictMode>,
);
