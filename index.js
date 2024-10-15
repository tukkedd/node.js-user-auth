import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

import { PORT, SECRET_JWT_KEY } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()
app.set('view engine', 'ejs')

app.use(express.json()) // middelware ve si en la peticion tiene que transformar a json, revisa el cuerpo 
app.use(cookieParser())

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await UserRepository.login({ username, password })
        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_JWT_KEY, {
            expiresIn: '1h'
        })
        res
        .cookie('access_token', token, {
            httpOnly: true,     // esto es que la cookie "solo" se puede acceder en el Servidor
            secure: process.env.NODE_ENV === 'production', // la cookie solo se puede acceder en https
            sameSite: 'strict', // la cookie solo se puede acceder en el mismo dominio,
            maxAge: 1000 * 60 * 60 // la cookie solo tiene validez de 1h
        })
        .send({ user, token })
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

