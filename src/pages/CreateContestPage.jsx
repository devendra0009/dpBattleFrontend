import React from "react";
import MainLayout from "../layout/MainLayout";
import CreateContest from "../features/contests/components/CreateContest";
import { useSelector } from "react-redux";
import { selectUserAuthenticated } from "../features/auth/authSlice";

const CreateContestPage = () => {
  const userAuthenticated = useSelector(selectUserAuthenticated);
  return (
    <MainLayout>
      {userAuthenticated ? (
        <CreateContest />
      ) : (
        <h2 className="  flex justify-center items-center h-[50vh]">Please login to create a contest</h2>
      )}
    </MainLayout>
  );
};

export default CreateContestPage;
