import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UsersListProvider } from './contexto/UserListContext';
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <UsersListProvider>
      <Router>
        <App />
      </Router>
    </UsersListProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
