import React, {useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'

const FlexyDiv = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
height: 60vh;
width:80%;
`

const FlexyForm = styled.form`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
margin: 0 1rem;
`

const Input = styled.input`
width:20rem;
margin: .5rem 0;
`

const initailValues = {
    name: '',
    bio: ''
}

const Button = styled.button`
width: 10rem;
margin: .5rem 0;
`

function url(path){
    return process.env.NODE_ENV === 'development'
      ? `http://localhost:5000${path}`
      : path
}

const Form = (props) => {
    const [formValues, setFormValues] = useState(initailValues)

    const onClickCancel = e => {
        e.preventDefault()
        props.setAddUser(false)
    }

    const onSubmit = e => {
        e.preventDefault()
        axios.post(url('/api/users/'), formValues)
            .then(res => {
                props.setAddUser(false)
            }).catch(err => {
                console.log("ERROR: ", err)
            })
    }

    const onChange = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    return(
        <FlexyDiv>
            <FlexyForm onSubmit={onSubmit}>
                <Input onChange={onChange} type='text' name='name' placeholder='Name'/>
                <Input onChange={onChange} type='text' name='bio' placeholder='Bio'/>
                <Button>Submit</Button>
                <Button onClick={onClickCancel}>Cancel</Button>
            </FlexyForm>

        </FlexyDiv>
    )
}

export default Form