import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
    palette: {
        primary: {
            light: '#242526',
            main: '#18191a',
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',

            contrastText: '#ffcc00',
        },
        custom: {
            light: '#ffa726',
            main: '#f57c00',
            dark: '#ef6c00',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});
export const customInputField = createTheme({
    palette: {
        primary: {
            light: '#FFFFFF',
            main: '#F5F5DC',
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',

            contrastText: '#ffcc00',
        },
        custom: {
            light: '#ffa726',
            main: '#f57c00',
            dark: '#ef6c00',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});