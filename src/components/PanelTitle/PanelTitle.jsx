import { Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './PanelTitle.styles';
function PanelTitle({ title, children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
      <div>{children}</div>
    </div>
  );
}

export default PanelTitle;
