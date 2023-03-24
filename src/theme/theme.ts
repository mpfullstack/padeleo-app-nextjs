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
    fontFamily: [
      'Mulish',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 22,
    h1: {
      fontSize: '2rem',
      fontWeight: '700',
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
    button: {
      fontSize: '1.4rem',
      fontWeight: '500',
    },
  },
};

export default createTheme(themeOptions);
