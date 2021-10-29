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
import useStyles from './Register.styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom';
import { useInput } from '../../hooks/use-input';
import ButtonLoading from '../../components/UI/ButtonLoading/ButtonLoading';

function Register() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const [birthError, setBirthError] = useState(null);
  const [isNotMatch, setIsNotMatch] = useState(true);

  const [error, setError] = useState(null);
  const history = useHistory();
  const location = useLocation();

  const {
    enteredInput: username,
    inputBlurHandler: usernameBlurHandler,
    inputChangeHandler: usernameChangeHandler,
    inputReset: usernameReset,
    inputIsValid: usernameIsvalid,
    hasError: usernameHasError,
    errorMsg: usernameErrorMessage,
  } = useInput();

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
    enteredInput: address,
    inputBlurHandler: addressBlurHandler,
    inputChangeHandler: addressChangeHandler,
    inputReset: addressReset,
    inputIsValid: addressIsvalid,
    hasError: addressHasError,
    errorMsg: addressErrorMessage,
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

  const {
    enteredInput: confirmpassword,
    inputBlurHandler: confirmpasswordBlurHandler,
    inputChangeHandler: confirmpasswordChangeHandler,
    inputReset: confirmpasswordReset,
    inputIsValid: confirmpasswordIsvalid,
    hasError: confirmpasswordHasError,
    errorMsg: confirmpasswordErrorMessage,
    isTouched,
  } = useInput();

  const passwordOnChangeHandler = (e) => {
    passwordChangeHandler(e);
    if (e.target.value !== confirmpassword && isTouched) {
      setIsNotMatch(true);
    } else {
      setIsNotMatch(false);
    }
  };
  const confirmPasswordOnChangeHandler = (e) => {
    confirmpasswordChangeHandler(e);
    if (e.target.value !== password) {
      setIsNotMatch(true);
    } else {
      setIsNotMatch(false);
    }
  };

  const formIsValid =
    usernameIsvalid &&
    addressIsvalid &&
    emailIsvalid &&
    passwordIsvalid &&
    confirmpasswordIsvalid &&
    birthError === null;

  const toggleShowPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };
  const mouseDownPasswordHandler = (event) => {
    event.preventDefault();
  };
  const toggleShowRetypePasswordHandler = () => {
    setShowRetypePassword((prevState) => !prevState);
  };
  const mouseDownRetypePasswordHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <div>
        <form className={classes.form}>
          <Typography variant="h6" className={classes.title}>
            Register
          </Typography>
          <div className={classes.formControl}>
            <FormControl
              error={usernameHasError}
              variant="filled"
              fullWidth
              className={classes.textField}>
              <InputLabel htmlFor="username" className={classes.inputLabel}>
                FullName
              </InputLabel>
              <FilledInput
                value={username}
                onBlur={usernameBlurHandler}
                onChange={usernameChangeHandler}
                id="username"
                type="text"
              />
            </FormControl>
            {usernameHasError && (
              <FormHelperText className={classes.errorMessage}>
                {usernameErrorMessage}
              </FormHelperText>
            )}
          </div>

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
              error={addressHasError}
              variant="filled"
              fullWidth
              className={classes.textField}>
              <InputLabel htmlFor="address" className={classes.inputLabel}>
                Address
              </InputLabel>
              <FilledInput
                value={address}
                onBlur={addressBlurHandler}
                onChange={addressChangeHandler}
                id="address"
                type="text"
              />
            </FormControl>
            {addressHasError && (
              <FormHelperText className={classes.errorMessage}>
                {addressErrorMessage}
              </FormHelperText>
            )}
          </div>

          <div className={classes.formControl}>
            <FormControl
              error={passwordHasError}
              className={classes.textField}
              variant="filled"
              fullWidth>
              <InputLabel htmlFor="password" className={classes.inputLabel}>
                Password
              </InputLabel>
              <FilledInput
                value={password}
                onBlur={passwordBlurHandler}
                onChange={passwordOnChangeHandler}
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
              <InputLabel htmlFor="confirmpassword" className={classes.inputLabel}>
                Retype password
              </InputLabel>
              <FilledInput
                value={confirmpassword}
                onBlur={confirmpasswordBlurHandler}
                onChange={confirmPasswordOnChangeHandler}
                id="retype-password"
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
                <>ValidationError: Retype password does not match password</>
              </FormHelperText>
            )}
          </div>
          {error && <FormHelperText className={classes.resError}>{error}</FormHelperText>}
          <ButtonLoading size="large" type="submit" disabled={!formIsValid}>
            Register
          </ButtonLoading>

          <Box display="flex" justifyContent="flex-end">
            <Typography variant="body2" className={classes.textHelper}>
              <Link to="/login">Already have an account?</Link>
            </Typography>
          </Box>
        </form>
      </div>
    </div>
  );
}

export default Register;
