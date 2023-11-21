import styled from 'styled-components';
import AllUsers from '../features/allUsers/components/AllUsers';
import AllContest from '../features/contests/components/AllContest';
import MainLayout from '../layout/MainLayout';

const Home = () => {
  console.log('in main');
  return (
    <MainLayout>
      <HomeWrapper>
        <AllUsers />
        <AllContest />
      </HomeWrapper>
    </MainLayout>
  );
};

const HomeWrapper = styled.div`
  height: 80vh;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1rem;
  @media (max-width: 750px) {
    grid-template-columns: none;
    /* background-color: aqua; */
  }

`;

export default Home;
