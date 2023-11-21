import React from 'react';
import Navbar from '../components/nav/Navbar';
import Footer from '../components/footer/Footer';
import styled from 'styled-components';

const MainLayout = ({ children }) => {
  return (
    <Container>
      <Navbar />
      <Content>{children}</Content>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  width: 80vw;
  /* min-height: 80vh; */
  /* background-color: aquamarine; */
  margin: 0 auto;
  @media (max-width: 1200px) {
    width: 90vw;
    /* background-color: red; */
  }
  @media (max-width: 1050px) {
    width: 98vw;
    /* background-color: red; */
  }
`;

const Content = styled.div`
  min-height: 72vh; 
`;

export default MainLayout;
