import { FormHelperText, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './PasswordPanel.styles';
import ButtonLoading from '../../UI/ButtonLoading/ButtonLoading';
import PanelTitle from '../../PanelTitle/PanelTitle';

function PasswordPanel() {
  const classes = useStyles();
  const formSubmitHandler = () => {};
  return (
    <div className={classes.root}>
      <PanelTitle title="Đổi mật khẩu" />
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <TextField
          variant="outlined"
          size="small"
          margin="dense"
          label="Mật khẩu hiện tại"
          fullWidth
          type="password"
          className={classes.input}
        />

        <Link to="/forgot-password">
          <FormHelperText>Quên mật khẩu?</FormHelperText>
        </Link>
        <TextField
          variant="outlined"
          size="small"
          margin="dense"
          label="Mật khẩu mới"
          fullWidth
          type="password"
          className={classes.input}
        />
        <TextField
          variant="outlined"
          size="small"
          margin="dense"
          label="Xác nhận mật khẩu"
          fullWidth
          type="password"
          className={classes.input}
        />
        <ButtonLoading
          style={{ fontSize: 15, marginTop: 10 }}
          className={classes.btn}
          isLoading={false}
          type="submit"
          fullWidth={false}>
          Lưu
        </ButtonLoading>
      </form>
    </div>
  );
}

export default PasswordPanel;
