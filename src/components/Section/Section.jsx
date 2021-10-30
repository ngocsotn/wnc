import { Container } from '@material-ui/core';
import React from 'react';
import useStyles from './Section.styles';
function Section({ children, background, ...props }) {
  const classes = useStyles({ background });
  return (
    <div className={classes.root} {...props}>
      <Container>{children}</Container>
    </div>
  );
}

export default Section;
