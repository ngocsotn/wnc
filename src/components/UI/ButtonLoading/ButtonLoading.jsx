import { Button, CircularProgress } from '@material-ui/core';
import React from 'react';
import useStyles from './ButtonLoading.styles';

function ButtonLoading({ children, size, onClick, isLoading, fullWidth = true, ...props }) {
  const classes = useStyles();
  return (
    <>
      {isLoading && (
        <Button
          className={`${classes.root} ${classes.buttonLoading}`}
          fullWidth={fullWidth}
          size={size}
          variant="contained"
          color="primary"
          startIcon={<CircularProgress size={22} style={{ color: '#fff' }} />}
        />
      )}
      {!isLoading && (
        <Button
          className={classes.root}
          variant="contained"
          color="primary"
          fullWidth={fullWidth}
          size={size}
          onClick={onClick}
          {...props}>
          {children}
        </Button>
      )}
    </>
  );
}

export default ButtonLoading;
