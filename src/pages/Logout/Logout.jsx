import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { authActions } from '../../slices/auth.slice';

function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.logout());
  }, [dispatch]);

  return (
    <Redirect
      to={{
        pathname: '/login',
      }}
    />
  );
}

export default Logout;
