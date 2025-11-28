import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserAuthenticated } from "../features/auth/authSlice";
import Login from "../features/auth/components/Login";
import Modal from "../components/modals/Modal";

const LoginPage = () => {
  const userAuthenticated = useSelector(selectUserAuthenticated);
  const [searchParams, setSearchParams] = useSearchParams();
  const isModal = searchParams.get("modal") === "login";

  const closeModal = () => {
    searchParams.delete("modal");
    setSearchParams(searchParams, { replace: true });
  };

  useEffect(() => {
    // If authenticated and modal is open, close it
    if (userAuthenticated && isModal) {
      closeModal();
    }
  }, [userAuthenticated, isModal]);

  // If it's a modal, show modal version
  if (isModal) {
    return (
      <Modal isOpen={true} onClose={closeModal} title="Login">
        <Login onSuccess={closeModal} />
      </Modal>
    );
  }

  // If authenticated, don't show login page
  if (userAuthenticated) {
    return null;
  }

  // Full page version (fallback)
  return <Login />;
};

export default LoginPage;
