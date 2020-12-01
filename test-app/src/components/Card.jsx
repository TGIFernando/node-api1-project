import React, {useState} from 'react'
import styled from 'styled-components'

import ClickForm from './ClickForm'

const Div = styled.div`
border: 2px solid black;
width: 40%;
margin: 2rem;
background-color: #A7CDBD;
`

const Name = styled.h1`
font-size:3rem;
text-align:center;
`
const Bio = styled.h2`
font-size:2rem;
text-align:center;
`

const Card = (props) => {
    
    const onClick = () => {
        props.setClicked(true)
        console.log("Clicked: ", props.clicked)
    }
    return(
        <Div onClick={onClick}>
            <Name>{props.name}</Name>
            <Bio>Bio: {props.bio}</Bio>
            {props.clicked ? <ClickForm setClicked={props.setClicked} name={props.name} bio={props.bio} id={props.id}/> : <></>}
        </Div>
    )
}

export default Card