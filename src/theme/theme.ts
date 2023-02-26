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
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.8rem',
    },
    h3: {
      fontSize: '1.6rem',
    },
    h4: {
      fontSize: '1.4em',
    },
  },
};

export default createTheme(themeOptions);
