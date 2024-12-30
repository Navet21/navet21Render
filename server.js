const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')

//Store

let store = {}
store.accounts = []

//Express

let app = express()

// Uso de middlewares
app.use(bodyParser.json()) // Middleware para parsear JSON
app.use(logger('dev')) // Middleware para registrar solicitudes en la consola
app.use(errorhandler()) // Middleware para manejar errores en modo desarrollo


//Endpoints

//Confirmacion de Render

app.get('/', (_req, res) => {
    res.send('API REST desplegada en Render.com!!')
})

//Recibir las cuentas.
app.get('/accounts', (req, res) => {
    res.status(200).send(store.accounts)
})

//Registrar una cuenta
app.post('/accounts', (req, res) => {
    let newAccount = req.body
    let id = store.accounts.length
    store.accounts.push(newAccount)
    res.status(201).send({id: id})
})

//Modificar las cuentas
app.put('/accounts/:id', (req, res) => {
    store.accounts[req.params.id] = req.body
    res.status(200).send(store.accounts[req.params.id])
})

//Eliminar la cuenta
app.delete('/accounts/:id', (req, res) => {
    store.accounts.splice(req.params.id, 1)
    res.status(204).send()
})

//Consultar un unico registro
app.get('/accounts/:id',(req,res) =>{
    let id = req.params.id
    res.status(200).send(store.accounts[id])
})


app.listen(port, () => {
    console.log(`Express escuchando en http://localhost:3000`)
})
//Puerto
app.listen(3000)