import React, { useState,useRef } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
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
import { register } from '../../slices/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import ButtonLoading from '../../components/UI/ButtonLoading/ButtonLoading';

function Register() {
	const reCaptchaRef = useRef(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const [birthError, setBirthError] = useState(null);
  const [isNotMatch, setIsNotMatch] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

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

  const formSubmitHandler = async (e) => {
		// const captchaToken = await reCaptchaRef.current.executeAsync();
    // reCaptchaRef.current.reset();
    // console.log("captchaToken", captchaToken);
    // // Pass this token response to your server for validation...
    
    // // Sample
    // const res = await axios.post(
    //   'http://localhost:3000/recaptcha',
    //   { 
    //     response: captchaToken
    //   }
    // );

    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    setError(null);
    try {
      await dispatch(
        register({
          email,
          name: username,
          password,
          address,
          address,
        })
      ).unwrap();
      emailReset();
      passwordReset();
      usernameReset();
      confirmpasswordReset();
      addressReset();
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
            Đăng ký tài khoản
          </Typography>
          <div className={classes.formControl}>
            <FormControl
              error={usernameHasError}
              variant="filled"
              fullWidth
              className={classes.textField}>
              <InputLabel htmlFor="username" className={classes.inputLabel}>
                Tên đầy đủ
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
                Địa chỉ
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
                Mật khẩu
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
                Nhập lại mật khẩu
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

					<div className={classes.reCaptchaV2}>
						<ReCAPTCHA
						ref={reCaptchaRef}
						sitekey={'6LdINR8dAAAAAC5zCvW9XwgHBAjDFej4_dIPe8bb'}
						size="normal"
						/>
					</div>

          <ButtonLoading size="large" type="submit" disabled={!formIsValid}>
            Đăng ký
          </ButtonLoading>

          <Box display="flex" justifyContent="flex-end">
            <Typography variant="body2" className={classes.textHelper}>
              <Link to="/login">Bạn đã có tài khoản?</Link>
            </Typography>
          </Box>
        </form>
      </div>
    </div>
  );
}

export default Register;
