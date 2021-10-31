import React from 'react';
import {
  Typography,
  FormControl,
  FilledInput,
  InputLabel,
  FormHelperText,
  Box,
  IconButton,
} from '@material-ui/core';
import useStyles from './VerifyEmail.styles';
import { useInput } from '../../hooks/use-input';
import ButtonLoading from '../../components/UI/ButtonLoading/ButtonLoading';
import { Sync } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';

function VerifyEmail() {
  const classes = useStyles();
  const location = useLocation();
  const { id, code } = queryString.parse(location.search);
  const history = useHistory();
  const {
    enteredInput: verifyCode,
    inputBlurHandler: verifyCodeBlurHandler,
    inputChangeHandler: verifyCodeChangeHandler,
    inputReset: verifyCodeReset,
    inputIsValid: verifyCodeIsvalid,
    hasError: verifyCodeHasError,
    errorMsg: verifyCodeErrorMessage,
  } = useInput(code || '');

  return (
    <div className={classes.root}>
      <div>
        <form className={classes.form}>
          <Typography variant="h6" className={classes.title}>
            Account activation
          </Typography>
          <div className={classes.formControl}>
            <FormControl
              error={verifyCodeHasError}
              variant="filled"
              fullWidth
              className={classes.textField}>
              <InputLabel htmlFor="verifyCode" className={classes.inputLabel}>
                Activation code
              </InputLabel>
              <FilledInput
                value={verifyCode}
                onBlur={verifyCodeBlurHandler}
                onChange={verifyCodeChangeHandler}
                id="verifyCode"
                type="text"
              />
            </FormControl>

            {(verifyCodeHasError && (
              <FormHelperText className={classes.errorMessage}>
                {verifyCodeErrorMessage}
              </FormHelperText>
            )) ||
              (verifyCode.length === 0 && (
                <FormHelperText style={{ color: '#333', paddingLeft: 8 }}>
                  Active code in your email
                </FormHelperText>
              ))}
          </div>
          <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            <Box flex={1} marginRight={1}>
              <ButtonLoading size="large" type="submit">
                Active
              </ButtonLoading>
            </Box>

            <IconButton color="primary">
              <Sync />
            </IconButton>
          </Box>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
