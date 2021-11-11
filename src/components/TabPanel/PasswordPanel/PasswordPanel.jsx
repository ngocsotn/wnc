import {
  FilledInput,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useStyles from './PasswordPanel.styles';
import ButtonLoading from '../../UI/ButtonLoading/ButtonLoading';
import PanelTitle from '../../PanelTitle/PanelTitle';
import { text } from '../../../schemas/common.schema';
import { useInput } from '../../../hooks/use-input';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { profileUpdatePassword } from '../../../slices/profile.slice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function PasswordPanel() {
  const classes = useStyles();
  const [isNotMatch, setIsNotMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.profile.loading);

  const {
    enteredInput: password,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    inputReset: passwordReset,
  } = useInput(text);
  const {
    enteredInput: newPassword,
    inputChangeHandler: newPasswordChangeHandler,
    inputBlurHandler: newPasswordBlurHandler,
    inputReset: newPasswordReset,
    inputIsValid: newPasswordIsValid,
    hasError: newPasswordHasError,
    errorMsg: newPasswordErrorMsg,
  } = useInput(text);
  const {
    enteredInput: confirmPassword,
    inputChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    inputReset: confirmPasswordReset,
    inputIsValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    errorMsg: confirmPasswordErrorMsg,
    isTouched: confirmPasswordIsTouched,
  } = useInput(text);

  const newPasswordOnChangeHandler = (e) => {
    newPasswordChangeHandler(e);
    if (e.target.value !== confirmPassword && confirmPasswordIsTouched) {
      setIsNotMatch(true);
    } else {
      setIsNotMatch(false);
    }
  };

  const toggleShowPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };
  const mouseDownPasswordHandler = (event) => {
    event.preventDefault();
  };

  const formIsValid = newPasswordIsValid && !isNotMatch && confirmPasswordIsValid;

  const confirmPasswordOnChangeHandler = (e) => {
    confirmPasswordChangeHandler(e);
    if (e.target.value !== newPassword) {
      setIsNotMatch(true);
    } else {
      setIsNotMatch(false);
    }
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) return;

    try {
      await dispatch(
        profileUpdatePassword({
          password,
          new_password: newPassword,
        })
      ).unwrap();

      toast.success('Đổi mật khẩu thành công thành công');
      passwordReset();
      newPasswordReset();
      confirmPasswordReset();
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className={classes.root}>
      <PanelTitle title="Đổi mật khẩu" />
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <FormControl variant="outlined" fullWidth size="small" style={{ marginBottom: 20 }}>
          <InputLabel htmlFor="current-password">Mật khẩu hiện tại</InputLabel>
          <OutlinedInput
            id="current-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPasswordHandler}
                  onMouseDown={mouseDownPasswordHandler}
                  edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={125}
          />
          <Link to="/forgot-password">
            <FormHelperText>Quên mật khẩu?</FormHelperText>
          </Link>
        </FormControl>

        <TextField
          variant="outlined"
          size="small"
          margin="dense"
          label="Mật khẩu mới"
          fullWidth
          type="password"
          className={classes.input}
          value={newPassword}
          onBlur={newPasswordBlurHandler}
          onChange={newPasswordOnChangeHandler}
          helperText={(newPasswordHasError && newPasswordErrorMsg) || ''}
          error={newPasswordHasError}
        />

        <FormControl fullWidth>
          <TextField
            variant="outlined"
            size="small"
            margin="dense"
            label="Xác nhận mật khẩu"
            fullWidth
            type="password"
            className={classes.input}
            value={confirmPassword}
            onBlur={confirmPasswordBlurHandler}
            onChange={confirmPasswordOnChangeHandler}
            helperText={(confirmPasswordHasError && confirmPasswordErrorMsg) || ''}
            error={confirmPasswordHasError}
          />
          {isNotMatch && confirmPasswordIsTouched && !confirmPasswordHasError && (
            <FormHelperText className={classes.errorMessage}>
              <>ValidationError: Không trùng khớp với mật khẩu đã nhập</>
            </FormHelperText>
          )}
        </FormControl>

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

export default PasswordPanel;
