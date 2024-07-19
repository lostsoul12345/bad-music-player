import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, pink } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: green[400],
            contrastText: '#ffffff',
        },
        secondary: {
            main: pink[400],
            contrastText: '#ffffff',
        },
        background: {
            default: '#121212',
            paper: '#1D1D1D',
        },
        text: {
            primary: '#ffffff',
            secondary: '#aaaaaa',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1D1D1D',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '30px',
                },
                containedPrimary: {
                    backgroundColor: green[400],
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: green[500],
                    },
                },
                containedSecondary: {
                    backgroundColor: pink[400],
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: pink[500],
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                    '&:hover': {
                        color: green[400],
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1D1D1D',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#1D1D1D',
                },
            },
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#ffffff',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 700,
            color: '#ffffff',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#ffffff',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#ffffff',
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#ffffff',
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 700,
            color: '#ffffff',
        },
        body1: {
            fontSize: '1rem',
            color: '#aaaaaa',
        },
        body2: {
            fontSize: '0.875rem',
            color: '#aaaaaa',
        },
    },
});

function Theme({ children }) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default Theme