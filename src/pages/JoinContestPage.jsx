import React from "react";
import MainLayout from "../layout/MainLayout";
import JoinContestComponent from "../features/contests/components/JoinContestComponent.jsx";
import { useSelector } from "react-redux";
import { selectUserAuthenticated } from "../features/auth/authSlice.jsx";

const JoinContestPage = () => {
  const userAuthenticated = useSelector(selectUserAuthenticated);
  return (
    <MainLayout>
      {userAuthenticated ? (
        <JoinContestComponent />
      ) : (
        <h2 className="flex justify-center items-center h-[50vh]">Please login to join a contest</h2>
      )}
    </MainLayout>
  );
};

export default JoinContestPage;
