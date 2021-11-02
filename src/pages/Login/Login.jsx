import React, { useEffect, useState } from 'react';
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

import useStyles from './Login.styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link, Redirect, useLocation } from 'react-router-dom';
import ButtonLoading from '../../components/UI/ButtonLoading/ButtonLoading';
import { useInput } from '../../hooks/use-input';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../slices/auth.slice';

function Login() {
  const classes = useStyles();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const {
    enteredInput: email,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
    inputReset: emailReset,
    inputIsValid: emailIsvalid,
    hasError: emailHasError,
    errorMsg: emailErrorMessage,
  } = useInput();

  const {
    enteredInput: password,
    inputBlurHandler: passwordBlurHandler,
    inputChangeHandler: passwordChangeHandler,
    inputReset: passwordReset,
    inputIsValid: passwordIsvalid,
    hasError: passwordHasError,
    errorMsg: passwordErrorMessage,
  } = useInput();

  const formIsValid = emailIsvalid && passwordIsvalid;

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
    setError(null);
    try {
      await dispatch(
        login({
          email,
          password,
        })
      ).unwrap();
      emailReset();
      passwordReset();
    } catch (error) {
      setError(error);
    }
  };

  if (isAuthenticated) {
    if (user?.banned) {
      return <div>Banned</div>;
    }

    if (!user?.verified) {
      return <Redirect to="/confirm-email" />;
    }
    return <Redirect to={location.state?.from || '/'} />;
  }

  return (
    <div className={classes.root}>
      <div>
        <form className={classes.form} onSubmit={formSubmitHandler}>
          <Typography variant="h6" className={classes.title}>
            Đăng nhập
          </Typography>
          <div className={classes.formControl}>
            <FormControl
              error={emailHasError}
              variant="filled"
              fullWidth
              className={classes.textField}>
              <InputLabel htmlFor="email" className={classes.inputLabel}>
                Email
              </InputLabel>
              <FilledInput
                value={email}
                onBlur={emailBlurHandler}
                onChange={emailChangeHandler}
                id="email"
                type="text"
              />
            </FormControl>
            {emailHasError && (
              <FormHelperText className={classes.errorMessage}>{emailErrorMessage}</FormHelperText>
            )}
          </div>

          <div className={classes.formControl}>
            <FormControl
              error={passwordHasError}
              className={classes.textField}
              variant="filled"
              fullWidth>
              <InputLabel htmlFor="password" className={classes.inputLabel}>
                Mật khẩu
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

          {error && <FormHelperText className={classes.resError}>{error}</FormHelperText>}
          <ButtonLoading size="large" type="submit" isLoading={isLoading} disabled={!formIsValid}>
            Đăng nhập
          </ButtonLoading>

          <Box display="flex" flexWrap="wrap" alignItems="center">
            <Typography variant="body2" className={classes.textHelper}>
              Bạn chưa có tài khoản? <Link to="/register">Đăng kí</Link>
            </Typography>
            <Typography variant="body2" className={classes.textHelper}>
              <Link to="/forgot-password">Quên mật khẩu?</Link>
            </Typography>
          </Box>
        </form>
      </div>
    </div>
  );
}

export default Login;
