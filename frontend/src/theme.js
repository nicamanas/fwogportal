import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#607D8B', // Blue-Grey
    },
    secondary: {
      main: '#688C61', // Medium Deep Orange
    },
    background: {
      default: '#FAFAFA', // Off-White
    },
    text: {
      primary: '#212121', // Dark Grey
      secondary: '#9E9E9E', // Grey
    },
  },
});

export default theme;
