import React from 'react';
import { Redirect } from 'react-router';

function Logout() {
  return (
    <Redirect
      to={{
        pathname: '/login',
      }}
    />
  );
}

export default Logout;
