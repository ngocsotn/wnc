import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

function ProtectedRoute(props) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  console.log(props);

  if (!isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: {
            from: props.currentPath,
          },
        }}
      />
    );
  }

  if (props.roles?.length > 0) {
    const isAccept = props.roles.includes((item) => item === user.role);
    if (!isAccept) {
      return (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      );
    }
  }

  if (user?.banned) {
    return (
      <Redirect
        to={{
          pathname: '/banned',
        }}
      />
    );
  }
  // if (user?.verified === false) {
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: '/confirm-email',
  //         state: {
  //           from: props.currentPath,
  //         },
  //       }}
  //     />
  //   );
  // }

  return <div>{props.children}</div>;
}

export default ProtectedRoute;
