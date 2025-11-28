import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserAuthenticated } from "../../features/auth/authSlice";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";

const ModalManager = () => {
  const [searchParams] = useSearchParams();
  const userAuthenticated = useSelector(selectUserAuthenticated);
  const modalType = searchParams.get("modal");

  // Don't show modals if user is already authenticated
  if (userAuthenticated) {
    return null;
  }

  // Render the appropriate modal page component
  // These components handle their own modal rendering based on the query param
  if (modalType === "login") {
    return <LoginPage />;
  }

  if (modalType === "register") {
    return <RegisterPage />;
  }

  return null;
};

export default ModalManager;
