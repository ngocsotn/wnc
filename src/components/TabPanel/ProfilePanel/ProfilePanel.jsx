import { Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './ProfilePanel.styles';
import ButtonLoading from '../../UI/ButtonLoading/ButtonLoading';
import PanelTitle from '../../PanelTitle/PanelTitle';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
function ProfilePanel() {
  const classes = useStyles();
  const formSubmitHandler = () => {};
  return (
    <div className={classes.root}>
      <PanelTitle title="Hồ sơ của tôi" />
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <TextField
          className={classes.input}
          variant="outlined"
          size="small"
          margin="dense"
          label="Họ tên"
          fullWidth
        />
        <TextField
          className={classes.input}
          variant="outlined"
          size="small"
          margin="dense"
          label="Email"
          fullWidth
        />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDateTimePicker
            className={classes.input}
            fullWidth
            label="Ngày sinh"
            onError={console.log}
            format="DD/MM/yyyy"
            inputVariant="outlined"
            margin="dense"
            size="small"
          />
        </MuiPickersUtilsProvider>

        <TextField
          className={classes.input}
          variant="outlined"
          size="small"
          margin="dense"
          label="Địa chỉ"
          fullWidth
          multiline
          rows={3}
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

export default ProfilePanel;
