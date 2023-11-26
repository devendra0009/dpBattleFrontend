import styled from 'styled-components';

export const Input1 = styled.input`
  ${'' /* cursor: pointer; */}
  padding: 0.7rem 0.5rem;
  margin-left: -0.5rem;
  border-radius: 10px;
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  border: none;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  &:focus {
    outline: none;
  }
`;
export const SearchInput = styled.input`
  ${'' /* padding: 0.5rem 2.5rem 0.5rem 0.8rem; */}
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  width: 100%;
  border: none;

  &:focus {
    outline: none;
  }
`;
