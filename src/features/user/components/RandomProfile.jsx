import React from 'react';
import Profile from './Profile';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../../allUsers/allUsersSlice';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const RandomProfile = () => {
  const allUsers = useSelector(selectAllUsers);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const searchedUser = allUsers.find((user) => user._id === id);
  console.log(searchedUser);
  return (
    <>
      <Profile user={searchedUser} width="150px" height="150px" />
    </>
  );
};

export default RandomProfile;
