import React from 'react';
import styled from 'styled-components';
import { Heading } from '../../../styled-components/headings/Heading';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../allUsersSlice';
import AllUsersComponent from './AllUsersComponent';

const AllUsers = () => {
  const users = useSelector(selectAllUsers);
  return (
    <AllUsersContainer>
      <Heading>All Users</Heading>
      <Users>
        {users && users.map((user, idx) => <AllUsersComponent user={user} />)}
      </Users>
    </AllUsersContainer>
  );
};

const AllUsersContainer = styled.div`
  padding: 0 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  /* border-left: 0.5px solid lightgray; */
  overflow: scroll;
  //scrollbar-width: thin; /* Firefox */
  scrollbar-color: transparent transparent; /* Firefox */
  @media (max-width:750px)
  {
    display: none;
  }
`;

const Users = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default AllUsers;
