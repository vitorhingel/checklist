import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';
import GeneralRoutes from './routes/GeneralRoutes';
import './assets/index.css';
import theme from './theme/';
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GeneralRoutes />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
