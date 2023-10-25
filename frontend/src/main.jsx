import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes } from '@generouted/react-router'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme.js'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// document.body.style.backgroundColor = "#e8eafb"; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </React.StrictMode>
)
