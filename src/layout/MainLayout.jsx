import React from "react";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/footer/Footer";
import ModalManager from "../components/modals/ModalManager";
import styled from "styled-components";

const MainLayout = ({ children }) => {
  return (
    <Container>
      <Navbar />
      <Content>{children}</Content>
      <Footer />
      <ModalManager />
    </Container>
  );
};

const Container = styled.div`
  width: 80vw;
  margin: 0 auto;
  @media (max-width: 1200px) {
    width: 90vw;
  }
  @media (max-width: 1050px) {
    width: 95vw;
  }
`;

const Content = styled.div`
  min-height: 72vh;
`;

export default MainLayout;
