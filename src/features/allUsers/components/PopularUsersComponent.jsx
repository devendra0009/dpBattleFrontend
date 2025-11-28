import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectPopularUserProfile,
  setSelectedPopularUserProfile,
  fetchAllUsersAsync,
  selectAllUsersLoading,
} from "../allUsersSlice";
import { selectTheme } from "../../theme/themeSlice";
import Profile from "../../user/components/Profile";
import { ITEMS_PER_PAGE } from "../../../utils/constants";

const PopularUsersComponent = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const loading = useSelector(selectAllUsersLoading);
  const selectedPopularUserProfile = useSelector(selectPopularUserProfile);
  const [popularUsers, setPopularUsers] = useState([]);

  // Fetch popular users sorted by followers (descending)
  useEffect(() => {
    const fetchPopularUsers = async () => {
      const result = await dispatch(
        fetchAllUsersAsync({
          page: 1,
          limit: ITEMS_PER_PAGE,
          sortFollowers: "desc", // Sort by followers descending
        })
      );

      if (fetchAllUsersAsync.fulfilled.match(result)) {
        const users = result.payload.resData.users || [];
        setPopularUsers(users);
        // Set first user as selected by default
        if (users.length > 0 && !selectedPopularUserProfile) {
          dispatch(setSelectedPopularUserProfile(users[0]));
        }
      }
    };

    fetchPopularUsers();
  }, [dispatch, selectedPopularUserProfile]);

  // Update selected profile when clicking on a user
  const handleUserClick = (user) => {
    dispatch(setSelectedPopularUserProfile(user));
  };

  return (
    <MainContainer>
      <PopularUsersComponentContainer currentTheme={currentTheme}>
        <h2>Top Profiles</h2>
        <NamesUser>
          {loading && popularUsers.length === 0 ? (
            <LoadingMessage currentTheme={currentTheme}>
              Loading popular users...
            </LoadingMessage>
          ) : (
            popularUsers.map((user, idx) => (
              <PopularUserElement
                user={user}
                key={user._id || idx}
                idx={idx}
                onClick={() => handleUserClick(user)}
                isSelected={selectedPopularUserProfile?._id === user._id}
                currentTheme={currentTheme}
              />
            ))
          )}
        </NamesUser>
      </PopularUsersComponentContainer>
      {selectedPopularUserProfile ? (
        <Profile
          user={selectedPopularUserProfile}
          width="80px"
          height={"80px"}
          containerWidth="100%"
          flexDirection={"column"}
        />
      ) : (
        <LoadingMessage currentTheme={currentTheme}>
          Loading User Details...
        </LoadingMessage>
      )}
    </MainContainer>
  );
};

const PopularUserElement = ({
  user,
  idx,
  onClick,
  isSelected,
  currentTheme,
}) => {
  if (!user) return null;
  const followersCount = user.followers?.length || 0;

  return (
    <PopularUserElementContainer
      currentTheme={currentTheme}
      onClick={onClick}
      isSelected={isSelected}
    >
      <Heading currentTheme={currentTheme}>
        {idx === 0 && (
          <h3>
            {idx + 1}. {user?.name || "Unknown"} ({followersCount} followers)
          </h3>
        )}
        {idx !== 0 && (
          <h4>
            {idx + 1}. {user?.name || "Unknown"} ({followersCount} followers)
          </h4>
        )}
      </Heading>
    </PopularUserElementContainer>
  );
};

const NamesUser = styled.div`
  width: 90%;
  font-size: 14px;
  border-radius: 10px;
  height: 400px;
  overflow-y: scroll;
  padding: 1rem;
  @media (max-width: 750px) {
    width: 90%;
    height: 120px;
    overflow-y: scroll;
    padding: 0.5rem 1rem;
  }
`;

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
    padding: 0.7rem;
    border-radius: 10px;
  }
  @media (max-width: 750px) {
    width: 90%;
    margin: 0 auto;
    h2 {
      font-size: 18px;
    }
  }
  @media (max-width: 430px) {
    width: 95%;
    margin: 0 auto;
    font-size: 14px;
    h2 {
      font-size: 15px;
    }
  }
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  @media (max-width: 750px) {
    grid-template-columns: none;
    display: flex;
    flex-direction: column;
  }
`;

const Heading = styled.div`
  background-color: ${(props) => props.theme[props.currentTheme].bg};
`;

const PopularUserElementContainer = styled.div`
  margin: 0 auto;
  padding: 1rem 0.8rem;
  display: flex;
  background-color: ${(props) =>
    props.isSelected
      ? props.theme[props.currentTheme].bgGreen
      : props.theme[props.currentTheme].bg};
  justify-content: center;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.2s ease;
  h3 {
    font-size: 18px;
    background-color: ${(props) =>
      props.isSelected
        ? props.theme[props.currentTheme].bgGreen
        : props.theme[props.currentTheme].bg};
    color: orange;
  }
  h4 {
    background-color: ${(props) =>
      props.isSelected
        ? props.theme[props.currentTheme].bgGreen
        : props.theme[props.currentTheme].bg};
  }

  &:hover {
    scale: 105%;
    background-color: ${(props) => props.theme[props.currentTheme].bgGreen};
    h3 {
      background-color: ${(props) => props.theme[props.currentTheme].bgGreen};
    }
    h4 {
      background-color: ${(props) => props.theme[props.currentTheme].bgGreen};
    }
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${(props) => props.theme[props.currentTheme].text};
  opacity: 0.7;
`;

export default PopularUsersComponent;
