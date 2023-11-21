import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0; padding: 0;
    background-color: ${(props) => props.theme[props.currentTheme].bg};
    color: ${(props) => props.theme[props.currentTheme].text};
  }
  :root {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    ${'' /* dark  */}
    --primaryD: #3498db;
    --secondaryD: white;
    --textD : white;
    --textBlueD: #264c70;
    --bgD : black;
    --bg2D: rgb(49 49 49/1);
    --bluebgD: #B2FFFF ;
    --greenbgD: #2ecc71 ;
    --borderD: 
  0 1px 0 rgba(255, 255, 255, 0.5) inset, /* Top highlight */
  0 -1px 0 rgba(255, 255, 255, 0.5) inset, /* Bottom shadow */
  1px 0 0 rgba(255, 255, 255, 0.5) inset, /* Right highlight */
  -1px 0 0 rgba(255, 255, 255, 0.5) inset; /* Left shadow */


    ${'' /* light  */}
    --primaryL: #3498db;
    --secondaryL: white;
    --textL : black;
    --bgL : white;
    --bg2L: whitesmoke;
    --bluebgL: #87CEFA;
    --greenbgL: lightgreen;
    --borderL: 0 1px 0 rgba(0, 0, 0, 0.1), /* Top highlight */
  0 -1px 0 rgba(0, 0, 0, 0.1), /* Bottom shadow */
  1px 0 0 rgba(0, 0, 0, 0.1), /* Right highlight */
  -1px 0 0 rgba(0, 0, 0, 0.1); /* Left shadow */
  }
`;
