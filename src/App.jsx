import "./App.css";
import { GlobalStyle } from "./styled-components/globals/globalStyleVariables";
import { ThemeProvider } from "styled-components";
import { router, theme } from "./utils/commonUtils";
import { ToastContainer } from "react-toastify";
import { RouterProvider, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "./features/theme/themeSlice";
import { useEffect, useState } from "react";
import {
  authenticateUserAsync,
  selectUserAuthenticated,
  logoutUserAsync,
} from "./features/auth/authSlice";
import { fetchUserInfoAsync } from "./features/user/userSlice";
import { getToken } from "./utils/constants";
import { fetchAllContestAsync } from "./features/contests/contestSlice";
import { fetchAllUsersAsync } from "./features/allUsers/allUsersSlice";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toastError } from "./components/toasts/ToastError";

function App() {
  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const userAuthenticated = useSelector(selectUserAuthenticated);

  // Set up axios interceptor for 401 errors
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Clear auth state
          dispatch(logoutUserAsync());
          localStorage.removeItem("auth-token");

          // Show error toast
          toastError("Please login to continue.", "🔒", currentTheme);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [dispatch, currentTheme]);

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
  // useEffect(() => {
  //   if (userAuthenticated) {
  //     dispatch(fetchUserInfoAsync());
  //     dispatch(fetchAllContestAsync());
  //     dispatch(fetchAllUsersAsync());
  //   }
  // },[dispatch,userAuthenticated]);
  useEffect(() => {
    if (userAuthenticated) {
      dispatch(fetchUserInfoAsync());
    }
    // Fetch contests with default pagination (first page, default filters)
    dispatch(fetchAllContestAsync({ page: 1, limit: 10, status: "fighting" }));
    // Fetch users with default pagination (first page)
    dispatch(fetchAllUsersAsync({ page: 1, limit: 10 }));
  }, [dispatch, userAuthenticated]);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle currentTheme={currentTheme} />
      <RouterProvider router={router} />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
