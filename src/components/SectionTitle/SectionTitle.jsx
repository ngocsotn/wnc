import { IconButton, Typography } from '@material-ui/core';
import { Gavel } from '@material-ui/icons';
import React from 'react';
import useStyles from './SectionTitle.styles';

function SectionTitle({ title }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        {title}
      </Typography>
      <IconButton className={classes.icon}>
        <Gavel />
      </IconButton>
    </div>
  );
}

export default SectionTitle;
