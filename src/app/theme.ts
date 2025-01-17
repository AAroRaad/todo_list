
import { createTheme } from '@mui/material/styles';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const theme = createTheme({
    palette: {
        background: {
            default: '#f5f5f5',
        }
    },
    typography: {
        fontFamily: poppins.style.fontFamily,
    },
});