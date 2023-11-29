import styled from "styled-components";

export const Button1 =  styled.button`
background-color: ${(props)=>props.theme[props.currentTheme].bgGreen};
padding: 1rem;
${'' /* color: ${(props)=>props.theme[props.currentTheme].text}; */}
font-weight: bold;
border-radius: 10px;
color: black;
${'' /* border: 1px solid ${(props)=>props.theme[props.currentTheme].text}; */}
border: none;
cursor: pointer;
&:hover{
background-color: ${(props)=>props.theme[props.currentTheme==='light'?'dark':'light'].bgGreen};
}
`
