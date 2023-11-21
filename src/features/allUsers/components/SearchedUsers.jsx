import React from 'react';
import { useSelector } from 'react-redux';
import { selectSearchedUser } from '../../user/userSlice';
import { selectAllUsers } from '../allUsersSlice';
import styled from 'styled-components';
import { LuEye } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const SearchedUsers = () => {
  const navigate=useNavigate();
  const searchedUser = useSelector(selectSearchedUser);
  const allUsers = useSelector(selectAllUsers);
  const matchedUsers =
    allUsers &&
    allUsers
      .filter((user) =>
        user.email.toLowerCase().includes(searchedUser.toLowerCase())
      )
      .map((user) => user);

      const goToClickedUser=(user)=>{
        console.log(user);
        navigate(`/profile/user?id=${user._id}`);
     }
  return (
    <MainContainer>
    <SearchedUsersContainer >
      {' '}
      {matchedUsers?.length!==0 ?
        matchedUsers.map((matchedUser, idx) => (
          <div key={idx} onClick={()=>goToClickedUser(matchedUser)}>
            <img src={matchedUser.img} />
            <h5>{matchedUser.email.toUpperCase()}</h5>
          </div>
        )):<h4>No Users to show</h4>}
    </SearchedUsersContainer>
    </MainContainer>
  );
};

const MainContainer=styled.div`
position: absolute;
left: 0;
top: 3.5rem;
padding: 10px;
width: 96%;
background-color: whitesmoke;
`
const SearchedUsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 200px;
  overflow-y: scroll;
  scrollbar-color: transparent transparent;
  /* background-color: blue; */
  /* align-items: flex-start; */
  /* padding: 1rem; */
  div {
    display: flex;
    /* background-color: whitesmoke; */
    justify-content: space-around;
    align-items: center;
    padding: 5px 0;
    border-radius: 6px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 100%;
    }
    h5 {
      /* background-color: lightskyblue; */
    }
    &:hover {
      cursor: pointer;
      scale: 103%;
      background-color: lightgray;
    }
  }
  h4{
    text-align: center;
    margin-top: 2px;
    color: gray;
    
  }
`;

export default SearchedUsers;
