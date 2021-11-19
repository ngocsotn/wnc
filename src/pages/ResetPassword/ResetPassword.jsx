import React, { useState } from 'react';
import {
  Typography,
  FormControl,
  FilledInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Box,
  FormHelperText,
} from '@material-ui/core';
import queryString from 'query-string';

import useStyles from './ResetPassword.styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useInput } from '../../hooks/use-input';
import ButtonLoading from '../../components/UI/ButtonLoading/ButtonLoading';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { recovery } from '../../slices/auth.slice';
import { text } from '../../schemas/common.schema';
function ResetPassword() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [isNotMatch, setIsNotMatch] = useState(true);
  const loading = useSelector((state) => state.auth.loading);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const { code } = queryString.parse(location.search);

  const {
    enteredInput: password,
    inputBlurHandler: passwordBlurHandler,
    inputChangeHandler: passwordChangeHandler,
    inputReset: passwordReset,
    inputIsValid: passwordIsvalid,
    hasError: passwordHasError,
    errorMsg: passwordErrorMessage,
  } = useInput(text);

  const {
    enteredInput: confirmpassword,
    inputBlurHandler: confirmpasswordBlurHandler,
    inputChangeHandler: confirmpasswordChangeHandler,
    inputReset: confirmpasswordReset,
    inputIsValid: confirmpasswordIsvalid,
    hasError: confirmpasswordHasError,
    errorMsg: confirmpasswordErrorMessage,
    isTouched,
  } = useInput(text);

  const confirmPasswordOnChangeHandler = (e) => {
    confirmpasswordChangeHandler(e);
    if (e.target.value !== password) {
      setIsNotMatch(true);
    } else {
      setIsNotMatch(false);
    }
  };
  const toggleShowRetypePasswordHandler = () => {
    setShowRetypePassword((prevState) => !prevState);
  };
  const mouseDownRetypePasswordHandler = (event) => {
    event.preventDefault();
  };
  const formIsValid = passwordIsvalid && confirmpasswordIsvalid && !isNotMatch;

  const toggleShowPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };
  const mouseDownPasswordHandler = (event) => {
    event.preventDefault();
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    try {
      await dispatch(
        recovery({
          code,
          password,
        })
      ).unwrap();
      passwordReset();
      confirmpasswordReset();

      history.push('/login');
      toast.success('Đổi mật khẩu thành công');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className={classes.root}>
      <div>
        <form className={classes.form} onSubmit={formSubmitHandler}>
          <Typography variant="h6" className={classes.title}>
            Đặt lại mật khẩu
          </Typography>

          <div className={classes.formControl}>
            <FormControl
              error={passwordHasError}
              className={classes.textField}
              variant="filled"
              fullWidth>
              <InputLabel htmlFor="password" className={classes.inputLabel}>
                Mật khẩu mới
              </InputLabel>
              <FilledInput
                value={password}
                onBlur={passwordBlurHandler}
                onChange={passwordChangeHandler}
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={classes.inputField}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={toggleShowPasswordHandler}
                      onMouseDown={mouseDownPasswordHandler}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            {passwordHasError && (
              <FormHelperText className={classes.errorMessage}>
                {passwordErrorMessage}
              </FormHelperText>
            )}
          </div>

          <div className={classes.formControl}>
            <FormControl
              error={confirmpasswordHasError}
              className={classes.textField}
              variant="filled"
              fullWidth>
              <InputLabel htmlFor="confirmPassword" className={classes.inputLabel}>
                Nhập lại mật khẩu mới
              </InputLabel>
              <FilledInput
                value={confirmpassword}
                onBlur={confirmpasswordBlurHandler}
                onChange={confirmPasswordOnChangeHandler}
                id="confirmPassword"
                type={showRetypePassword ? 'text' : 'password'}
                className={classes.inputField}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={toggleShowRetypePasswordHandler}
                      onMouseDown={mouseDownRetypePasswordHandler}>
                      {showRetypePassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            {confirmpasswordHasError && (
              <FormHelperText className={classes.errorMessage}>
                {confirmpasswordErrorMessage}
              </FormHelperText>
            )}
            {isNotMatch && isTouched && !confirmpasswordHasError && (
              <FormHelperText className={classes.errorMessage}>
                <>ValidationError: Mật khẩu không trùng khớp</>
              </FormHelperText>
            )}
          </div>
          <ButtonLoading size="large" type="submit" disabled={!formIsValid} isLoading={loading}>
            Xác nhận
          </ButtonLoading>

          <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" className={classes.textHelper}>
              <Link to="/forgot-password">Quay lại</Link>
            </Typography>
            <Typography variant="body2" className={classes.textHelper}>
              <Link to="/login">Đăng nhập</Link>
            </Typography>
          </Box>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
