import { Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './PanelTitle.styles';
function PanelTitle({ title }) {
  const classes = useStyles();
  return (
    <Typography variant="h4" className={classes.root}>
      {title}
    </Typography>
  );
}

export default PanelTitle;
