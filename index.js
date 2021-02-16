//this is for connecting to the enviorment and heroku
require('dotenv').config()
//Imports
const express = require("express")
const shortid = require("shortid")

const server = express()
const cors = require("cors")
const path = require("path")

const port = process.env.PORT || 4000

//counfigure server to use json

server.use(cors())
server.use(express.json())
server.use(express.static(path.join(__dirname, 'test-app/build')))

//DummyData of users
let userData = [
    {
        id: shortid.generate(),
        name: "Fernando Chavez",
        bio: "I really like coding backend",
    },
    {
        id: shortid.generate(),
        name: "Morgan Eccles",
        bio: "I really like playing animal crossing uwu ",
    },
    {
        id: shortid.generate(),
        name: 'Bento',
        bio: 'I like jumping on my parents computer!'
    },
]
//Helper functions
const User = {
    getAll(){
        return userData
    },
    createNew(user){
        const newUser = { id: shortid.generate(), ...user}
        userData.push(newUser)
        return(newUser)
    },
    getById(id){
        return userData.find(user => user.id === id)
    },
    delete(id){
        const user = userData.find(user => user.id === id)
        if(user){
            userData = userData.filter(user => user.id !== id)
        }
        return user
    },
    update(id, changes){
        const user = userData.find(user => user.id === id)
        if (!user){
            return null
        } else {
            const newUser = {id, ...changes}
            userData = userData.map( user => {
                if(user.id === id) return newUser
                return user
            })
            return newUser
        }
    }
}

//Server endpoints
server.get('/api/users', (req, res) => {
    const users = User.getAll()
    res.status(200).json(users)
})

server.post('/api/users', (req, res) => {
    const newUser = req.body
    if (!newUser.name || !newUser.bio){
        res.status(500).json({ errorMessage: "Please provide name and bio for the user." })
    }else{
        const newlyCreatedUser = User.createNew(newUser)
        res.status(201).json(newlyCreatedUser)
    }
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    const user = User.getById(id)
    if(user){
        res.status(200).json(user)
    }else{
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    const deleted = User.delete(id)
    if(deleted){
        res.status(200).json(deleted)
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

server.put('/api/users/:id', (req, res) => {
    const changes = req.body
    const { id } = req.params
    const updatedUser = User.update(id, changes)
    if(updatedUser){
        res.status(200).json(updatedUser)
    } else {
        res.status(404).json({ errorMessage: "Please provide name and bio for the user." })
    }
})

//catch all endpoint
server.use("*", (_, res) => {
    res.sendFile(path.join(__dirname, 'test-app/build', 'index.html'))
})

//starting the server
server.listen(port, () => {
    console.log(`listening on port ${port}`)
})