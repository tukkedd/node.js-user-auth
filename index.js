import express from 'express'
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()
app.set('view engine', 'ejs')
app.use(express.json()) // middelware ve si en la peticion tiene que transformar a json, revisa el cuerpo 

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await UserRepository.login({ username, password })
        res.send({ user })
    } catch (error) {
        res.status(401).send(error.message)
    }
})
app.post('/register', async (req, res) => {
    const { username, password } = req.body


    try {
        const id = await UserRepository.create({ username, password })
        res.send({ id })
    } catch (e) {
        res.status(400).send(e.message)
    }
})
app.post('/logout', (req, res) => { })

app.post('/protected', (req, res) => {
    
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})

