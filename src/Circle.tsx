import React from "react";
import styled from "styled-components";


interface CircleProps {
    bgColor?:string,
    text?:string,
}


const Container = styled.div<CircleProps>`
width: 100px;
height: 100px;
background-color: ${props => props.theme.bgColor}

`;

const H1 = styled.h1<CircleProps>`
color: ${props => props.theme.textColor}
`;

function Circle({bgColor,text}:CircleProps){
    return(
        <div>
    <Container bgColor={bgColor}><H1>{text}</H1></Container>
    </div>
    )
}

export default Circle;