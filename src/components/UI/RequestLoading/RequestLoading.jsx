import { Box } from '@material-ui/core';
import React from 'react';
import useStyles from './RequestLoading.styles';

function RequestLoading(props) {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" justifyContent="center" padding={5} {...props}>
      <div className={classes.root}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </Box>
  );
}
export default RequestLoading;
