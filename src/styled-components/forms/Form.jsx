import styled from 'styled-components';

export const Form = styled.form`
  background-color: ${(props) =>
    props.theme[props.currentTheme].bg2}; // dynamic color light black
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 500px;
  border-radius: 10px;
  gap: 1.5rem;
  p {
    color: red;
    font-size: 12px;
    font-weight: bold;
    background-color: ${(props) => props.theme[props.currentTheme].bg2};
  }
  .link {
    text-decoration: none;
    background-color: ${(props) => props.theme[props.currentTheme].bgBlue};
    border-radius: 8px;
    text-align: center;
    color: black;
    font-size: 13px;
    font-weight: bold;
    padding: 1rem;
    border: 1px solid blue;
    &:hover{
      
      background-color: ${(props) => props.theme[props.currentTheme==='light'?'dark':'light'].bgBlue};
    }
  }
`;

export const FormTwo = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  p {
    color: red;
    font-size: 12px;
    font-weight: bold;
    /* background-color: ${(props) => props.theme[props.currentTheme].bg2}; */
  }
`;
