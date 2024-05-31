import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#002373',
      light: '#0037b8',
      dark: '#001852',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F1C40F',
      light: '#ffda33',
      dark: '#e5b90b',
      contrastText: '#000',
    },
    background: {
      default: '#E7F1FA',
      paper: '#fff',
    },
    lightBlue: {
      main: '#cad8df',
      light: '#c8d7de',
      dark: '#8cabba',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: 'inter, roboto, sans-serif',
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;