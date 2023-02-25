import { ThemeOptions, createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#5ec7ac',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ba54ea',
    },
    text: {
      primary: 'rgba(0,0,0,0.64)',
    },
  },
  typography: {
    h1: {
      fontSize: '2.6rem',
    },
    h2: {
      fontSize: '2.3rem',
    },
    h3: {
      fontSize: '2.1rem',
    },
    h4: {
      fontSize: '1.9rem',
    },
  },
};

export default createTheme(themeOptions);
