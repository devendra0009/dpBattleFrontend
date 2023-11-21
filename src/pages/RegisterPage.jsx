import React from 'react'
import Register from '../features/auth/components/Register'
import { useSelector } from 'react-redux';
import { selectUserAuthenticated } from '../features/auth/authSlice';
import styled from 'styled-components';
import ThemeToggler from '../components/theme/ThemeToggler';
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {
  const userAuthenticated = useSelector(selectUserAuthenticated);

  return (
    <>
      {
        userAuthenticated  && <Navigate to='/' />
      }
      <div>
        <FloatingToggler>
          <ThemeToggler />
        </FloatingToggler>
        <Register />
      </div>
    </>
  );
}

const FloatingToggler = styled.div`
  position: absolute;
  left: 49%;
  top: 10%;
`;

export default RegisterPage