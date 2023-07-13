const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())

const rotaUsuario = require('./routes/usuario')
const rotaEmpresa = require('./routes/empresa')

app.use(morgan('dev'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
     'Access-Control-Allow-Headers',
     'Origin, X-Requrested-With, Content-Type, Accept, Authorization'
    )
    if(res.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).send({})
    }
    next()
})

app.use('/usuario', rotaUsuario)
app.use('/empresa', rotaEmpresa)

app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada')
    erro.status = 404
    next(erro)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app