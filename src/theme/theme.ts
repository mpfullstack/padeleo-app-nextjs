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
      primary: 'rgba(0,0,0,0.58)',
    },
  },
};

export default createTheme(themeOptions);
