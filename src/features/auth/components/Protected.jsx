// import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserAuthenticated } from '../authSlice';

const Protected = ({ children }) => {
  const userAuthenticated = useSelector(selectUserAuthenticated);
  console.log(userAuthenticated, "protexted");
  if (!userAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }
  else
  {
    return children;
  }
};

export default Protected;
