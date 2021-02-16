import React, {useEffect, useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'

import Card from './components/Card'
import Form from './components/Form'

import './App.css';

const FlexyDiv = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:space-around;
`

const Button = styled.button`
width: 10rem;
margin-top: 1rem;
`

function url(path){
  return process.env.NODE_ENV === 'development'
    ? `http://localhost:5000${path}`
    : path
}

function App() {
  const [users, setUsers] = useState([])
  const [addUser, setAddUser] = useState(false)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    axios.get(url('/api/users'))
      .then(res => {
        setUsers(res.data)
      }).catch(err => {
        console.log("Y IS THERE AN ERROR: ", err)
      })
  },[clicked, addUser])

  const onClickAddUser = () => {
    setAddUser(true)
  }

  return (
    <div>
      <FlexyDiv>
        {addUser ? <></> : <Button onClick={onClickAddUser}>Add User</Button>}
      </FlexyDiv>
      <FlexyDiv>
        {addUser ? <Form setAddUser={setAddUser}/> : users.map(item => <Card setClicked={setClicked} clicked={clicked} name={item.name} bio={item.bio} key={item.id} id={item.id}/>)}
      </FlexyDiv>
    </div>
  );
}

export default App;
