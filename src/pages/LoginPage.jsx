import React from 'react';
import Login from '../features/auth/components/Login';
import { selectUserAuthenticated } from '../features/auth/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ThemeToggler from '../components/theme/ThemeToggler';
import styled from 'styled-components';

const LoginPage = () => {
  const userAuthenticated = useSelector(selectUserAuthenticated);
  const navigate=useNavigate();
  if (userAuthenticated) {
    navigate('/');
    return null;
  }
  return (
    <>
      <div>
        <FloatingToggler>
          <ThemeToggler />
        </FloatingToggler>
        <Login />
      </div>
    </>
  );
};

const FloatingToggler = styled.div`
  position: absolute;
  left: 49%;
  top: 10%;
`;

export default LoginPage;
