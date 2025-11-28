import React from "react";
import { useSelector } from "react-redux";
import { selectUserAuthenticated } from "../authSlice";
import styled from "styled-components";
import { selectTheme } from "../../theme/themeSlice";

const Protected = ({ children }) => {
  const userAuthenticated = useSelector(selectUserAuthenticated);
  const currentTheme = useSelector(selectTheme);

  if (!userAuthenticated) {
    return (
      <ProtectedContainer currentTheme={currentTheme}>
        <MessageContainer currentTheme={currentTheme}>
          <h2>🔒 Please login</h2>
        </MessageContainer>
      </ProtectedContainer>
    );
  }

  return children;
};

const ProtectedContainer = styled.div`
  padding: 2rem;
  background-color: ${(props) => props.theme[props.currentTheme].bg};
  width: 100%;
`;

const MessageContainer = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  border-radius: 10px;
  width: 100%;

  h2 {
    color: ${(props) => props.theme[props.currentTheme].text};
    margin: 0;
    font-size: 1.5rem;
  }

  @media (max-width: 750px) {
    padding: 1.5rem;
    h2 {
      font-size: 1.2rem;
    }
  }
`;

export default Protected;
