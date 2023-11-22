import './App.css';
import { GlobalStyle } from './styled-components/globals/globalStyleVariables';
import { ThemeProvider } from 'styled-components';
import { router, theme } from './utils/commonUtils';
import { ToastContainer } from 'react-toastify';
import { RouterProvider, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from './features/theme/themeSlice';
import { useEffect, useState } from 'react';
import {
  authenticateUserAsync,
  selectUserAuthenticated,
} from './features/auth/authSlice';
import { fetchUserInfoAsync } from './features/user/userSlice';
import { getToken } from './utils/constants';
import { fetchAllContestAsync } from './features/contests/contestSlice';
import { fetchAllUsersAsync } from './features/allUsers/allUsersSlice';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const userAuthenticated = useSelector(selectUserAuthenticated);

  const checkUser = () => {
    const token = getToken();
    console.log(token);
    if (token) {
      // if we get token, validate that token if it is correct or not
      dispatch(authenticateUserAsync(token));
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  useEffect(() => {
    if (userAuthenticated) {
      dispatch(fetchUserInfoAsync());
      dispatch(fetchAllContestAsync());
      dispatch(fetchAllUsersAsync());
    }
  },[dispatch,userAuthenticated]);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle currentTheme={currentTheme} />
      <RouterProvider router={router} />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
