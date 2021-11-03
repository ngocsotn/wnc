import React, { useCallback, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { confirmEmail } from '../../slices/auth.slice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function VerifyEmail() {
  const classes = useStyles();
  const location = useLocation();
  const { code } = queryString.parse(location.search);
  const history = useHistory();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  const {
    enteredInput: verifyCode,
    inputBlurHandler: verifyCodeBlurHandler,
    inputChangeHandler: verifyCodeChangeHandler,
    inputReset: verifyCodeReset,
    inputIsValid: verifyCodeIsvalid,
    hasError: verifyCodeHasError,
    errorMsg: verifyCodeErrorMessage,
    setEnteredInput: setVerifyCode,
  } = useInput();

  const confirmEmailHandler = useCallback(
    async (code) => {
      try {
        await dispatch(confirmEmail({ code })).unwrap();
        toast.success('Verify successfully!!!');
        history.push(location.state?.from || '/');
      } catch (error) {
        toast.error(error);
      }
    },
    [dispatch, history, location.state]
  );

  useEffect(() => {
    if (code) {
      setVerifyCode(code);
      confirmEmailHandler(code);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.root}>
      <div>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            confirmEmailHandler(verifyCode);
          }}>
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
              <ButtonLoading
                size="large"
                type="submit"
                isLoading={isLoading}
                disabled={!verifyCodeIsvalid}>
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
