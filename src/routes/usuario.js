const express = require('express')
const router = express.Router()

const executeQuery = require('../services/connectionFirebird')

router.get('/', (req, res, next) => {
    executeQuery("SELECT CODIGO_USUARIO, NOME, EMAIL, LOGIN FROM VIEW_USUARIO ", function(err, result){
        if(err){
            res.status(500).json(err)
        } else {
            res.status(200).json(result)
        }
    })
})

router.post('/', (req, res, next) => {
    executeQuery("EXECUTE PROCEDURE FAZ_USUARIO(?, ?, ?, ?, ?, ?, ?) ", 
    
    [req.body.CODIGO_USUARIO,
     req.body.NOME,
     req.body.EMAIL, 
     req.body.LOGIN, 
     req.body.SENHA, 
     req.body.FOTO, 
     req.body.WTIP,
    ],

     function(err, result){
        if(err){
            res.status(500).json(err)
        } else {
            res.status(200).json(result)
        }
    })
})

router.get('/:id_usuario', (req, res, next) => {
    executeQuery("SELECT * FROM VIEW_USUARIO WHERE CODIGO_USUARIO = ? ", [req.params.id_usuario], function(err, result){
        if(err){
            res.status(500).json(err)
        } else {
            res.status(200).json(result)
        }
    })
})

router.patch('/:id_usuario', (req, res, next) => {
    executeQuery("EXECUTE PROCEDURE FAZ_USUARIO(?, ?, ?, ?, ?, ?, ?) ", 
    
    [req.params.id_usuario,
     req.body.NOME,
     req.body.EMAIL, 
     req.body.LOGIN, 
     req.body.SENHA, 
     req.body.FOTO, 
     req.body.WTIP,
    ],

     function(err, result){
        if(err){
            res.status(500).json(err)
        } else {
            res.status(200).json(result)
        }
    })
})

router.delete('/:id_usuario', (req, res, next) => {
    executeQuery("EXECUTE PROCEDURE FAZ_USUARIO(?, ?, ?, ?, ?, ?, ?) ", 
    
    [req.params.id_usuario,
     req.body.NOME,
     req.body.EMAIL, 
     req.body.LOGIN, 
     req.body.SENHA, 
     req.body.FOTO, 
     req.body.WTIP,
    ],

     function(err, result){
        if(err){
            res.status(500).json(err)
        } else {
            res.status(200).json(result)
        }
    })
})

module.exports = router