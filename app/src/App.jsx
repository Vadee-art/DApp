import React from 'react';
import { useRoutes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import Footer from './components/nav/Footer';
import Router from './routes/Router';
import customTheme from './styles/customTheme';

function App() {
  const routing = useRoutes(Router);
  return (
    <ThemeProvider theme={customTheme}>
      <React.StrictMode>
        <CssBaseline />
        {routing}
        );
      </React.StrictMode>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
