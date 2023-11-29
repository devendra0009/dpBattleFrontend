// Profile.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUserInfo, updateFollowerFollowingAsync } from '../userSlice';
import { selectTheme } from '../../theme/themeSlice';
import { MdVerified } from 'react-icons/md';
import { selectAllContests } from '../../contests/contestSlice';
import { GiBattleAxe } from 'react-icons/gi';
import {
  fetchAllUsersAsync,
  selectAllUsers,
  updateAllUsers,
} from '../../allUsers/allUsersSlice';

// Define the bluish theme
const theme = {
  primaryColor: '#3498db', // A shade of blue
  secondaryColor: '#ecf0f1', // Light background
  textColor: '#2c3e50', // Dark text color
};

// Styled components for the profile
const ProfileContainer = styled.div`
  width: ${(props) => props.containerWidth};
  margin: 0 auto;
  padding: 1rem 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  @media (max-width: 1050px) {
    width: ${(props) => props.containerWidth2};
  }
  @media (max-width: 750px) {
    width: ${(props) => props.containerWidth3};
  }
`;

const PersonalInfoContainer = styled.div`
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: center;
  align-items: center;
  gap: 2rem;
  /* @media (max-width:750px)
  {
    gap: 1rem;
  } */
  @media (max-width: 430px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  /* margin-bottom: 10px; */
  @media (max-width: 750px) {
    width: 120px;
    height: 120px;
  }
  @media (max-width: 500px) {
    width: 80px;
    height: 80px;
  }
`;

const UserName = styled.h4`
  color: ${(props) => props.theme[props.currentTheme].text2};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  @media (max-width: 750px) {
    font-size: 1rem;
  }
  /* @media (max-width:430px)
  {
    font-size: 16px;
  } */
`;

const UserMid = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  font-size: 15px;
  @media (max-width: 750px) {
    font-size: 14px;
  }
  @media (max-width: 430px) {
    font-size: 13px;
  }
`;

const UserEmail = styled.p`
  color: gray;
`;

const UserRole = styled.p`
  color: gray;
`;

const FollowStats = styled.div`
  display: flex;
  color: ${theme.textColor};
  gap: 1rem;
  font-size: 14px;
  @media (max-width: 750px) {
    font-size: 14px;
  }
  @media (max-width: 430px) {
    font-size: 13px;
  }
`;

const Followers = styled.p`
  /* margin-right: 20px; */
`;

const Following = styled.p`
  /* margin-right: 20px; */
`;

const UserDetails = styled.div`
  /* background-color: red; */
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OngoingContest = styled.div`
  margin-top: 1rem;
  /* font-weight: bold; */
  /* border-radius: 10px; */
  /* background-color: red; */
`;

const Profile = ({
  user,
  width,
  height,
  containerWidth,
  containerWidth2,
  containerWidth3,
  flexDirection,
}) => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const currentUser = useSelector(selectUserInfo);
  const allUsers = useSelector(selectAllUsers);
  const isRandom = user._id !== currentUser._id;
  console.log(user.followers, currentUser._id);
  const isFollowed = user.followers.some(
    (uid) => uid.toString() === currentUser._id.toString()
  );
  console.log(isFollowed);
  const handleFollowClick = async () => {
    // data m mujhe api ko operation type dena h like follow ya unfollow, and targetUserId
    const targetUserId = user._id;
    let operation;
    if (isFollowed) {
      // means phle se follow array m h to operation unfollow ka bhej taki array se pull hojae
      operation = 'unfollow';
    } else {
      operation = 'follow';
    }
    const data = {
      targetUserId: targetUserId,
      operation: operation,
    };
    // console.log(data);
    const updatedData = await dispatch(updateFollowerFollowingAsync(data));
    // console.log(updatedData);
    dispatch(updateAllUsers(updatedData.payload.resData.updatedTargetUser));
    console.log('follow');
  };
  return (
    <>
      {user && (
        <ProfileContainer
          currentTheme={currentTheme}
          containerWidth={containerWidth}
          containerWidth2={containerWidth2}
          containerWidth3={containerWidth3}
        >
          <PersonalInfoContainer
            currentTheme={currentTheme}
            flexDirection={flexDirection}
          >
            <ProfileImage
              width={width}
              height={height}
              src={
                user?.img ||
                'data:image/png;base64,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'
              }
              alt="Profile"
            />
            <UserDetails className="userDetails">
              <UserName currentTheme={currentTheme}>
                {user.name.toUpperCase()} <MdVerified />
              </UserName>
              {/* <UserInfo> */}
              <UserMid>
                <UserEmail>{user.email}</UserEmail>
                <UserRole>{user.role}</UserRole>
              </UserMid>
              <FollowStats>
                <Followers>{user.followers.length} Followers</Followers>
                <Following>{user.following.length} Following</Following>
              </FollowStats>
              {isRandom && (
                <FollowButton onClick={handleFollowClick}>
                  {isFollowed ? 'Unfollow' : 'Follow'}
                </FollowButton>
              )}
              {/* </UserInfo> */}
            </UserDetails>
          </PersonalInfoContainer>
          <OngoingContest>
            <OngoingContestComponent user={user} />
          </OngoingContest>
        </ProfileContainer>
      )}
    </>
  );
};

export default Profile;

const FollowButton = styled.button`
  background-color: lightskyblue;
  border: none;
  padding: 0.5rem;
  border-radius: 10px;
  &:hover {
    background-color: #6dc3f8;
    scale: 102%;
    cursor: pointer;
  }
`;

const TabContainer = styled.div`
  /* width: 400px; */
  margin:30px auto;

`;

const Tabs = styled.div`
  display: flex;
  /* margin-bottom: 10px; */
  padding: 0.5rem 0;
  
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  background-color:${(props)=>(props.isactive ?'lightgreen': props.theme[props.currentTheme].bg )} ;
  color: ${(props) =>  props.theme[props.currentTheme].text};
  border: none;
  cursor: pointer;
  outline: none;
`;

const OngoingContestComponent = ({ user }) => {
  const allContests = useSelector(selectAllContests);
  const onGoingContests = allContests.filter(
    (obj) => obj.user1 === user._id || obj.user2 === user._id
  );
  // console.log(onGoingContests, 'ongoincontest');
  const currentTheme = useSelector(selectTheme);
  console.log(user, 'user');
  const fightingContests = onGoingContests.filter(
    (obj) => obj.status === 'fighting'
  );
  const matchingContests = onGoingContests.filter(
    (obj) => obj.status === 'matching'
  );
  const [activeTab, setActiveTab] = useState('fighting');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <TabContainer>
      <Tabs>
        <TabButton
          currentTheme={currentTheme}
          onClick={() => handleTabClick('fighting')}
          isactive={activeTab === 'fighting'}
        >
          Fighting
        </TabButton>
        <TabButton
          currentTheme={currentTheme}
          onClick={() => handleTabClick('matching')}
          isactive={activeTab === 'matching'}
        >
          Matching
        </TabButton>
      </Tabs>
      {activeTab === 'matching' ? (
        <MatchingContestComponent matchingContests={matchingContests} />
      ) : (
        <FightingContestComponent fightingContests={fightingContests} />
      )}
    </TabContainer>
  );
};

const MatchingContestComponent = ({ matchingContests }) => {
  const currentTheme = useSelector(selectTheme);
  // console.log(fightingContests);
  return (
    <XXXContestComponentContainer>
      {matchingContests.length > 0 ? (
        matchingContests.map((fc, idx) => (
          <ContestComponentContainer currentTheme={currentTheme}>
            {/* divide this container into two parts */}
            <UserAContainer currentTheme={currentTheme}>
              <Image src={fc.img1} alt="img1" />
            </UserAContainer>
            <Extras currentTheme={currentTheme}>
              <GiBattleAxe size={30} className="axe-icon" />
            </Extras>
            <UserBContainer currentTheme={currentTheme}>
              <Image src={fc.img2} alt="img2" />
            </UserBContainer>
          </ContestComponentContainer>
        ))
      ) : (
        <h4>No Contest Started/Joined Yet</h4>
      )}
    </XXXContestComponentContainer>
  );
};
const FightingContestComponent = ({ fightingContests }) => {
  const currentTheme = useSelector(selectTheme);
  console.log(fightingContests);
  return (
    <XXXContestComponentContainer>
      {fightingContests.length > 0 ? (
        fightingContests.map((fc, idx) => (
          <ContestComponentContainer currentTheme={currentTheme}>
            {/* divide this container into two parts */}
            <UserAContainer currentTheme={currentTheme}>
              <Image src={fc.img1} alt="img1" />
            </UserAContainer>
            <Extras currentTheme={currentTheme}>
              <GiBattleAxe size={30} className="axe-icon" />
            </Extras>
            <UserBContainer currentTheme={currentTheme}>
              <Image src={fc.img2} alt="img2" />
            </UserBContainer>
          </ContestComponentContainer>
        ))
      ) : (
        <h4>No Contest Started/Joined Yet</h4>
      )}
    </XXXContestComponentContainer>
  );
};
const XXXContestComponentContainer = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* padding: 1rem 0; */
  overflow: scroll;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  height: 320px;
  h4 {
    text-align: center;
    color: gray;
  }
`;

const ContestComponentContainer = styled.div`
  /* background-color: aquamarine; */
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  padding: 1rem;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  /* gap: 2rem; */
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 1px solid lightgray;
  padding: 5px;
`;
const UserAContainer = styled.div`
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  /* padding: 1rem 0; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ButtonContainer = styled.div``;
const UserBContainer = styled.div`
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  /* padding: 1rem 0; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const Extras = styled.div`
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .axe-icon {
    background-color: ${(props) => props.theme[props.currentTheme].bg2};
  }
  @media (max-width: 750px) {
    .axe-icon {
      width: 25px;
    }
  }
  @media (max-width: 430px) {
    .axe-icon {
      width: 20px;
    }
  }
`;
