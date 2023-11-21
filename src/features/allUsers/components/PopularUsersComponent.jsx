import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  selectAllUsers,
  selectPopularUserProfile,
  setSelectedPopularUserProfile,
} from '../allUsersSlice';
import { selectTheme } from '../../theme/themeSlice';
import { LuEye } from 'react-icons/lu';
import Profile from '../../user/components/Profile';

const PopularUsersComponent = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  // map the list of popular users, displaying their profile image, name, no. of votes they got, no. of contest they won, winning percentage,
  const allUsers = useSelector(selectAllUsers);
  const selectedPopularUserProfile = useSelector(selectPopularUserProfile);
  // put thsese acc to votes sorted
  // console.log('pop user render',selectedUser,allUsers);
  useEffect(() => {
    if (!selectedPopularUserProfile) {
      dispatch(setSelectedPopularUserProfile(allUsers && allUsers[0]));
    }
  }, []);
  return (
    <MainContainer>
      <PopularUsersComponentContainer currentTheme={currentTheme}>
        <h2>Top Profiles</h2>
        {allUsers &&
          allUsers.map((user, idx) => (
            <PopularUserElement user={user} key={idx} i={idx} />
          ))}
      </PopularUsersComponentContainer>
      {/* <PopularUserProfile selectedUser={selectedUser} /> */}
      {selectedPopularUserProfile ? (
        <Profile
          user={selectedPopularUserProfile}
          width="80px"
          height={'80px'}
          containerWidth="100%"
          flexDirection={'column'}
        />
      ) : (
        <>Loading User Details...</>
      )}
    </MainContainer>
  );
};

const PopularUsersComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;
  h2 {
    background-color: lightskyblue;
    padding: 0.7rem;
    border-radius: 10px;
  }
  @media (max-width: 750px) {
  }
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  @media (max-width: 750px) {
    grid-template-columns: none;
    display: flex;
    flex-direction: column-reverse;
  }
`;

export default PopularUsersComponent;

const PopularUserElement = ({ user, i: idx }) => {
  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();
  return (
    <PopularUserElementContainer
      currentTheme={currentTheme}
      onClick={() => dispatch(setSelectedPopularUserProfile(user))}
    >
      <Heading currentTheme={currentTheme}>
        {idx == 0 && (
          <h3>
            {idx + 1}. {user.name}
          </h3>
        )}
        {idx != 0 && (
          <h4>
            {idx + 1}. {user.name}
          </h4>
        )}
      </Heading>
    </PopularUserElementContainer>
  );
};

const Heading = styled.div`
  background-color: ${(props) => props.theme[props.currentTheme].bg};
`;

const PopularUserElementContainer = styled.div`
  width: 90%;
  padding: 1rem 0.8rem;
  display: flex;
  background-color: ${(props) => props.theme[props.currentTheme].bg};
  justify-content: center;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    scale: 105%;
    background-color: ${(props) => props.theme[props.currentTheme].bgGreen};
    /* background-color: lightgreen; */
    h3 {
      background-color: ${(props) => props.theme[props.currentTheme].bgGreen};
    }
    h4 {
      background-color: ${(props) => props.theme[props.currentTheme].bgGreen};
    }
  }
  h3 {
    background-color: ${(props) => props.theme[props.currentTheme].bg};
  }
  h4 {
    background-color: ${(props) => props.theme[props.currentTheme].bg};
  }
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  /* border: 1px solid lightgray; */
  padding: 5px;
`;

const PopularUserProfile = ({ selectedUser: user }) => {
  console.log(user);
  return (
    <PopularUserProfileContainer>
      <Profile
        user={user}
        width="80px"
        height={'80px'}
        containerWidth="100%"
        flexDirection={'column'}
      />
    </PopularUserProfileContainer>
  );
};

const PopularUserProfileContainer = styled.div`
  /* height: 100%; */
  /* background-color: aqua; */
`;
