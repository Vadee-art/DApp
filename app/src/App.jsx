import React from 'react';
import { useRoutes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import Router from './routes/Router';
import customTheme from './styles/customTheme';

function App() {
  const routing = useRoutes(Router);
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {/* hint: if on useEffect will Dispatch twice to check for errors */}
      {/* <React.StrictMode> */}
      {routing}
      {/* </React.StrictMode> */}
    </ThemeProvider>
  );
}

export default App;
