import { createTheme } from '@mui/material/styles';

// Create the custom theme
const Theme = createTheme({
    // Palette configuration (colors)
    palette: {
        primary: {
            main: '#1976d2', // Primary Blue Color
        },
        secondary: {
            main: '#FF5722', // Secondary Orange Color
        },
        error: {
            main: '#d32f2f', // Error Red Color
        },
        background: {
            default: '#f4f6f8', // Light Background Color
        },
        text: {
            primary: '#333', // Dark Text Color
            secondary: '#555', // Lighter Text Color
        },
    },

    // Typography configuration==========================================================
    typography: {
        fontFamily: '"Roboto", sans-serif',
        h4: {
            fontWeight: 600,
            fontSize: '1.75rem',
            textAlign: 'center',
            color: '#333',
        },
        h6: {
            fontWeight: 500,
            color: '#1976d2',
        },
        subtitle1: {
            fontSize: '1rem',
            color: '#1976d2',
        },
    },

    // Overrides for Material-UI ===============================================
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                        backgroundColor: '#1565c0',
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    backgroundColor: '#1976d2',
                    color: 'white',
                    fontWeight: 'bold',
                },
                body: {
                    fontSize: '0.9rem',
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:nth-of-type(even)': {
                        backgroundColor: '#f5f5f5',
                    },
                    '&:hover': {
                        backgroundColor: '#e0f7fa',
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: '#1976d2',
                    '&.Mui-checked': {
                        color: '#1976d2',
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    transition: 'background-color 0.3s ease-in-out',
                    '&:hover': {
                        backgroundColor: '#e3f2fd',
                    },
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: '#1976d2',
                    fontSize: '0.875rem',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                },
            },
        },
    },

    spacing: 8,
});

export default Theme;
