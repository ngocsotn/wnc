import React from 'react';
import {
  Typography,
  FormControl,
  FilledInput,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';

import useStyles from './ForgotPassword.styles';
import { useInput } from '../../hooks/use-input';
import ButtonLoading from '../../components/UI/ButtonLoading/ButtonLoading';

function ForgotPassword() {
  const classes = useStyles();

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

  return (
    <div className={classes.root}>
      <div>
        <form className={classes.form}>
          <Typography variant="h6" className={classes.title}>
            Forgot Password
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

          <ButtonLoading size="large" type="submit" disabled={!formIsValid}>
            Send
          </ButtonLoading>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
