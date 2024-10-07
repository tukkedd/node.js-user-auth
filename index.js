import express from 'express'
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()
app.use(express.json()) // middelware ve si en la peticion tiene que transformar a json, revisa el cuerpo 

app.get('/', (req, res) => {
    res.send('<h1>hello world</h1>')
})

app.post('/login', (req, res) => { })
app.post('/register', (req, res) => {
    const { username, password } = req.body


    try {
        const id = UserRepository.create({ username, password })
        res.send({ id })
    } catch (e) {
        res.status(400).send(e.message)
    }
})
app.post('/logout', (req, res) => { })

app.post('/protected', (req, res) => { })

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
}) 
