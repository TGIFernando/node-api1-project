import React, { useState } from 'react'
import axios from 'axios'

const ClickForm = (props) => {
    const initailValues = {
        name: props.name,
        bio: props.bio
    }
    const [formValues, setFormValues] = useState(initailValues)
    const id = props.id

    const onChange = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/users/${id}`, formValues)
            .then(res => {
                props.setClicked(false)
            }).catch(err => {
                console.log("ERROR: ", err)
            })
        
    }

    const onDelete = e => {
        e.preventDefault()
        axios.delete(`http://localhost:5000/api/users/${id}`)
            .then(res => {
                props.setClicked(false)
            }).catch(err => {
                console.log("ERROR: ", err)
                props.setClicked(false)
            })
    }

    const onCancel = e => {
        e.preventDefault()
        if(props.clicked){
            props.setClicked(false)
        } else {
            props.setClicked(false)
        }
    }

    
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value={formValues.name} onChange={onChange} type='text' name='name' placeholder='Name'/>
                <input value={formValues.bio} onChange={onChange} type='text' name='bio' placeholder='Bio'/>
                <button>Submit</button>
                <button onClick={onDelete}>Delete</button>
                <button onClick={onCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default ClickForm