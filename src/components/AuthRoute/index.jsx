import React from 'react';
import { Redirect } from 'react-router-dom';

const AuthRoute = (props) => {
  const { children } = props;
  const isLogin = localStorage.getItem('isLogin');
  if (isLogin === 'true') {
    return <>{children}</>;
  } else {
    return <Redirect to="/login" />;
  }
};

export default AuthRoute;
