import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { MdVerified } from 'react-icons/md';
import { selectTheme } from '../../theme/themeSlice';
import { LuEye } from 'react-icons/lu';
import { Navigate, useNavigate } from 'react-router-dom';

const AllUsersComponent = ({ user }) => {
  const navigate=useNavigate();
  const currentTheme = useSelector(selectTheme);

  const goToClickedUser=()=>{
     navigate(`/profile/user?id=${user._id}`);
  }
  return (
    <AllUsersComponentContainer currentTheme={currentTheme}>
      <Image src={user.img} alt="img1" currentTheme={currentTheme} />
      <UserName currentTheme={currentTheme}>
        {user.name.toUpperCase()} <MdVerified />
      </UserName>
      <LuEye size={30} className='eye-icon' onClick={goToClickedUser} />
    </AllUsersComponentContainer>
  );
};
const AllUsersComponentContainer = styled.div`
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  padding: 1rem;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  .eye-icon{
    background-color: ${(props) => props.theme[props.currentTheme].bg2};
    margin: auto;
    cursor: pointer;
    &:hover{
      scale: 110%;
    }
  }
  @media (max-width: 1050px) {
    grid-template-columns: none;
    margin:  0 auto;
    /* background-color: red; */
  }
  `;
const UserName = styled.h4`
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  color: ${(props) => props.theme[props.currentTheme].text2};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  `;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  /* border: 1px solid ${(props) => props.theme[props.currentTheme].border}; */
  @media (max-width: 1050px) {
    display: none;
  }
  padding: 5px;
`;

export default AllUsersComponent;
