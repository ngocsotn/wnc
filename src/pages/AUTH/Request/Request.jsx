import { Box, Button, Container, TextField, Typography } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Section from '../../../components/Section/Section';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import ButtonLoading from '../../../components/UI/ButtonLoading/ButtonLoading';
import RequestLoading from '../../../components/UI/RequestLoading/RequestLoading';
import { useInput } from '../../../hooks/use-input';
import { text } from '../../../schemas/common.schema';
import { requestCreateNew, requestGetSelfStatus } from '../../../slices/requests.slice';

function Request() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.request.loading);
  const sending = useSelector((state) => state.request.sending);
  const [sent, setSent] = useState(false);

  const {
    enteredInput: message,
    inputBlurHandler: messageBlurHandler,
    inputChangeHandler: messageChangeHandler,
    inputReset: messageReset,
    inputIsValid: messageIsvalid,
    hasError: messageHasError,
    errorMsg: messageErrorMessage,
  } = useInput(text, 'Tôi muốn làm seller, cảm ơn.');

  const requestSendHandler = async () => {
    try {
      await dispatch(
        requestCreateNew({
          message,
        })
      ).unwrap();
      toast.success('Gửi yêu cầu thành công');
      setSent(true);
    } catch (error) {
      toast.error(error);
    }
  };
  const requestGetSelfStatusHandler = useCallback(async () => {
    try {
      const response = await dispatch(requestGetSelfStatus()).unwrap();
      if (response?.id) {
        setSent(true);
      }
    } catch (error) {
      setSent(false);
    }
  }, []);

  useEffect(() => {
    requestGetSelfStatusHandler();
  }, [requestGetSelfStatusHandler]);
  return (
    <div>
      <Section>
        <SectionTitle title="Yêu cầu nâng cấp tài khoản" />
        {loading ? (
          <RequestLoading />
        ) : (
          <Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              {!sent ? (
                <div style={{ minWidth: '40rem' }}>
                  <TextField
                    variant="outlined"
                    multiline
                    rows={3}
                    fullWidth
                    label="Lời nhắn"
                    value={message}
                    error={messageHasError}
                    onBlur={messageBlurHandler}
                    onChange={messageChangeHandler}
                    helperText={(messageHasError && messageErrorMessage) || ''}
                    margin="normal"
                  />
                  <ButtonLoading
                    size="large"
                    type="submit"
                    isLoading={sending}
                    disabled={!messageIsvalid}
                    onClick={requestSendHandler}>
                    Gửi yêu cầu
                  </ButtonLoading>
                </div>
              ) : (
                <>
                  <Check color="primary" fontSize="large" />
                  <Typography variant="subtitle1" color="primary">
                    Đã gửi yêu cầu nâng cấp tài khoản bán hàng. Vui lòng đợi phản hồi từ admin
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        )}
      </Section>
    </div>
  );
}

export default Request;
