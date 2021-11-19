import { TextField, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import useStyles from './ProfilePanel.styles';
import ButtonLoading from '../../UI/ButtonLoading/ButtonLoading';
import PanelTitle from '../../PanelTitle/PanelTitle';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { profileGet, profileUpdateInfo } from '../../../slices/profile.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../../../hooks/use-input';
import { text } from '../../../schemas/common.schema';
import moment from 'moment';
import { toast } from 'react-toastify';
function ProfilePanel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user);
  const loading = useSelector((state) => state.profile.loading);

  const {
    enteredInput: fullName,
    inputChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHandler,
    // inputReset: fullNameReset,
    inputIsValid: fullNameIsValid,
    hasError: fullNameHasError,
    errorMsg: fullNameErrorMsg,
  } = useInput(text, user?.name || '');
  const {
    enteredInput: email,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    // inputReset: emailReset,
    inputIsValid: emailIsValid,
    hasError: emailHasError,
    errorMsg: emailErrorMsg,
  } = useInput(text, user?.email || '');
  const {
    enteredInput: address,
    inputChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    // inputReset: addressReset,
    inputIsValid: addressIsValid,
    hasError: addressHasError,
    errorMsg: addressErrorMsg,
  } = useInput(text, user?.address || '');

  const [birth, setBirth] = useState(moment(user?.birth || '01/01/1900', ['DD/MM/yyyy']));

  const getProfileHandler = useCallback(async () => {
    try {
      await dispatch(profileGet()).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const formIsValid =
    fullNameIsValid &&
    emailIsValid &&
    addressIsValid &&
    (fullName !== user.name ||
      email !== user.email ||
      address !== user.address ||
      moment(birth).format('DD/MM/yyyy') !== user.birth);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) return;

    try {
      await dispatch(
        profileUpdateInfo({
          name: fullName,
          email,
          address,
          birth: moment(birth).format('DD/MM/yyyy'),
        })
      ).unwrap();

      toast.success('Cập nhật thông tin thành công');
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getProfileHandler();
  }, [getProfileHandler]);

  useEffect(() => {
    setBirth(moment(user?.birth || '01/01/1900', ['DD/MM/yyyy']));
  }, [user]);
  return (
    <div className={classes.root}>
      <PanelTitle title="Hồ sơ của tôi" />
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <div className={classes}>
          <Typography className={classes.pointArea} component="span" align="left">
            Tổng lượt thích: {user?.point_like || 0}
          </Typography>
          <Typography className={classes.pointArea} component="span" align="center">
            Tổng lượt không thích: {user?.point_dislike || 0}
          </Typography>
          <Typography className={classes.pointArea} component="span" align="right">
            % điểm bản thân: {(user.point_like / (user.point_dislike + user.point_like)) * 100 || 0}
            %
          </Typography>
        </div>
        <TextField
          className={classes.input}
          variant="outlined"
          size="small"
          margin="normal"
          label="Họ tên"
          fullWidth
          value={fullName}
          onChange={fullNameChangeHandler}
          onBlur={fullNameBlurHandler}
          error={fullNameHasError}
          helperText={(fullNameHasError && fullNameErrorMsg) || ''}
        />
        <TextField
          className={classes.input}
          variant="outlined"
          size="small"
          margin="normal"
          label="Email"
          fullWidth
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          error={emailHasError}
          helperText={(emailHasError && emailErrorMsg) || ''}
        />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            className={classes.input}
            fullWidth
            label="Ngày sinh"
            // onError={console.log}
            format="DD/MM/yyyy"
            inputVariant="outlined"
            margin="normal"
            size="small"
            value={birth}
            onChange={setBirth}
          />
        </MuiPickersUtilsProvider>

        <TextField
          className={classes.input}
          variant="outlined"
          size="small"
          margin="normal"
          label="Địa chỉ"
          fullWidth
          multiline
          rows={3}
          value={address}
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
          error={addressHasError}
          helperText={(addressHasError && addressErrorMsg) || ''}
        />
        <ButtonLoading
          style={{ fontSize: 15, marginTop: 10 }}
          className={classes.btn}
          isLoading={loading}
          type="submit"
          fullWidth={false}
          disabled={!formIsValid}>
          Lưu
        </ButtonLoading>
      </form>
    </div>
  );
}

export default ProfilePanel;
