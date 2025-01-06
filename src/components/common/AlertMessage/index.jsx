import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAlertStore, alertActions } from '@/store';

// success, error, warning, info
function AlertMessage() {
  const [alertState, alertDispatch] = useAlertStore();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    alertDispatch(alertActions.hideAlert());
  };

  return (
    <Snackbar
      open={alertState.isShow}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert
        onClose={handleClose}
        severity={alertState.severity}
        variant="filled"
        sx={{ width: '100%' }}>
        {alertState.message}
      </Alert>
    </Snackbar>
  );
}

export default AlertMessage;
