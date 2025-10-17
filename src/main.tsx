import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { CssBaseline } from '@mui/material';
import App from './App';
import { LocalizationProvider, LocalizationContext } from './hooks/LocalizationProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <LocalizationProvider >
        <App />
      </LocalizationProvider>
    </BrowserRouter>
  </StrictMode>
)

