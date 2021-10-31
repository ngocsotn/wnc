import { IconButton, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';

import useStyles from './ModalTitle.styles';
function ModalTitle({ title, onClose }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h5">{title}</Typography>
      <IconButton onClick={onClose}>
        <Close />
      </IconButton>
    </div>
  );
}

export default ModalTitle;
