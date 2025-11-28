import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.$isModal ? "auto" : "100vh")};
  width: 100%;
`;
