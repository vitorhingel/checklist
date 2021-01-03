import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';

import theme from './theme/';
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <p>Hey!</p>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
