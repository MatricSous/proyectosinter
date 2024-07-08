import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import whitTheme from './theme/antdTheme';
import './theme/tailwindcss.css';
import { Provider } from 'react-redux';
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<Provider store={store}>
    {whitTheme(<App />)}
    </Provider>
</React.StrictMode>
);
