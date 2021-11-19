import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
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
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useInput } from '../../hooks/use-input';
import { register } from '../../slices/auth.slice';
import { postReCaptcha } from '../../slices/recatpcha.slice';
import { useDispatch, useSelector } from 'react-redux';
import ButtonLoading from '../../components/UI/ButtonLoading/ButtonLoading';
import { emailSchema, text } from '../../schemas/common.schema';
import { toast } from 'react-toastify';

function Register() {
  const reCaptchaRef = useRef(null);

  const classes = useStyles();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const loading = useSelector((state) => state.auth.loading);
  // const [birthDate, setBirthDate] = useState(new Date());
  // const [birthError, setBirthError] = useState(null);
  const [isNotMatch, setIsNotMatch] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const [error, setError] = useState(null);

  const location = useLocation();

  const {
    enteredInput: fullName,
    inputBlurHandler: fullNameBlurHandler,
    inputChangeHandler: fullNameChangeHandler,
    inputReset: fullNameReset,
    inputIsValid: fullNameIsvalid,
    hasError: fullNameHasError,
    errorMsg: fullNameErrorMessage,
  } = useInput(text);

  const {
    enteredInput: email,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
    inputReset: emailReset,
    inputIsValid: emailIsvalid,
    hasError: emailHasError,
    errorMsg: emailErrorMessage,
  } = useInput(emailSchema);

  const {
    enteredInput: address,
    inputBlurHandler: addressBlurHandler,
    inputChangeHandler: addressChangeHandler,
    inputReset: addressReset,
    inputIsValid: addressIsvalid,
    hasError: addressHasError,
    errorMsg: addressErrorMessage,
  } = useInput(text);

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
    fullNameIsvalid &&
    addressIsvalid &&
    emailIsvalid &&
    passwordIsvalid &&
    confirmpasswordIsvalid &&
    !isNotMatch;

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
    e.preventDefault();

    setError(null);

    if (!formIsValid) {
      return;
    }
    const captchaToken = await reCaptchaRef.current.executeAsync();
    reCaptchaRef.current.reset();

    try {
      const response = await dispatch(
        postReCaptcha({
          response: captchaToken,
        })
      ).unwrap();

      if (response?.success) {
        await dispatch(
          register({
            email,
            name: fullName,
            password,
            address,
          })
        ).unwrap();
        emailReset();
        passwordReset();
        fullNameReset();
        confirmpasswordReset();
        addressReset();
      } else {
        toast.error('Bạn là người máy');
      }
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
              error={fullNameHasError}
              variant="filled"
              fullWidth
              className={classes.textField}>
              <InputLabel htmlFor="fullName" className={classes.inputLabel}>
                Tên đầy đủ
              </InputLabel>
              <FilledInput
                value={fullName}
                onBlur={fullNameBlurHandler}
                onChange={fullNameChangeHandler}
                id="fullName"
                type="text"
              />
            </FormControl>
            {fullNameHasError && (
              <FormHelperText className={classes.errorMessage}>
                {fullNameErrorMessage}
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
                <>ValidationError: Không trùng khớp với mật khẩu đã nhập</>
              </FormHelperText>
            )}
          </div>
          {error && <FormHelperText className={classes.resError}>{error}</FormHelperText>}

          <div className={classes.reCaptchaV2}>
            <ReCAPTCHA
              ref={reCaptchaRef}
              sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
              size="invisible"
            />
          </div>

          <ButtonLoading size="large" type="submit" disabled={!formIsValid} isLoading={loading}>
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
