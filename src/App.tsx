import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import GlobalStyle from './styles/global';

import AppProvider from './hooks';
import Routes from './routes';

import store from './store';

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyle />
    </Router>
  </Provider>
);

export default App;
