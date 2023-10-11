import React from "react"
import { Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

export default function CustomSnackbar(
  { openSnackbar, handleCloseSnackbar, snackbarMsg }
) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div style={{ position: 'relative', height: '40px' }}>
      <Snackbar 
      open={openSnackbar}
      autoHideDuration={6000} 
      style={{ position: "absolute", top: "35px", left: "50%", transform: "translateX(-50%)"}}
      onClose={handleCloseSnackbar}>
        <Alert 
        onClose={handleCloseSnackbar} 
        severity="success" 
        sx={{ width: '100%' }}>
            {snackbarMsg}
        </Alert>
      </Snackbar>
      </div>
  )
};

