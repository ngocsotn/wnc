import { Button, CircularProgress } from '@material-ui/core';
import React from 'react';
import useStyles from './ButtonLoading.styles';

function ButtonLoading({ children, size, onClick, isLoading, ...props }) {
  const classes = useStyles();
  return (
    <div>
      {isLoading && (
        <Button
          className={`${classes.root} ${classes.buttonLoading}`}
          fullWidth
          size={size}
          variant="contained"
          color="primary"
          {...props}
          disabled={true}
          startIcon={<CircularProgress size={22} style={{ color: '#fff' }} />}
        />
      )}
      {!isLoading && (
        <Button
          className={classes.root}
          variant="contained"
          color="primary"
          fullWidth
          size={size}
          onClick={onClick}
          {...props}>
          {children}
        </Button>
      )}
    </div>
  );
}
export default ButtonLoading;
