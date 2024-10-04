import express from 'express'
import { PORT } from './config.js'

const app = express()

app.get('/', (req, res) => {
    res.send('<h1>hello world</h1>')
})

app.post('/login', (req, res) => {})
app.post('/register', (req, res) => {})
app.post('/logout', (req, res) => {})

app.post('/protected', (req, res) => {})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})
