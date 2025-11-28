import React from "react";
import MainLayout from "../layout/MainLayout";
import Profile from "../features/user/components/Profile";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../features/user/userSlice";
import { selectUserAuthenticated } from "../features/auth/authSlice";

const ProfilePage = () => {
  const userAuthenticated = useSelector(selectUserAuthenticated);
  const user = useSelector(selectUserInfo);
  console.log("User in profile page:", user);
  return (
    <MainLayout>
      {userAuthenticated ? (
        <Profile
          user={user}
          width="150px"
          height="150px"
          containerWidth="60%"
          containerWidth2="80%"
          containerWidth3="90%"
          flexDirection={"row"}
        />
      ) : (
        <h2 className="flex justify-center items-center h-[50vh]">
          Please login to view your profile
        </h2>
      )}
    </MainLayout>
  );
};

export default ProfilePage;
