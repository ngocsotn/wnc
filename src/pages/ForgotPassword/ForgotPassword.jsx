import React, { useState } from 'react';
import {
  Typography,
  FormControl,
  FilledInput,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';

import useStyles from './ForgotPassword.styles';
import { useInput } from '../../hooks/use-input';
import { forgotPassword } from '../../slices/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import ButtonLoading from '../../components/UI/ButtonLoading/ButtonLoading';

function ForgotPassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const {
    enteredInput: email,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
    inputReset: emailReset,
    inputIsValid: emailIsvalid,
    hasError: emailHasError,
    errorMsg: emailErrorMessage,
  } = useInput();

  const formIsValid = emailIsvalid;
  const [error, setError] = useState(null);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    setError(null);
    try {
      await dispatch(
        forgotPassword({
          email,
        })
      ).unwrap();
      emailReset();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className={classes.root}>
      <div>
        <form className={classes.form} onSubmit={formSubmitHandler}>
          <Typography variant="h6" className={classes.title}>
            Khôi phục mật khẩu
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
          {error && <FormHelperText className={classes.errorMessage}>{error}</FormHelperText>}
          <ButtonLoading size="large" type="submit" disabled={!formIsValid} isLoading={loading}>
            Gửi email
          </ButtonLoading>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
