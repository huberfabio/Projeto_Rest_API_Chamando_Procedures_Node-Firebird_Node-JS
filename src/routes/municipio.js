const express = require('express')
const router = express.Router()

const executeQuery = require('../services/connectionFirebird')

router.get('/', (req, res, next) => {
    executeQuery('SELECT * FROM VIEW_MUNICIPIO ', function(err, result){
        if (err){
            res.status(500).json(err)
        } else {
            res.status(200).json(result)
        }
    })
})

router.post('/', (req, res, next) => {
    executeQuery("EXECUTE PROCEDURE FAZ_MUNICIPIO(?,?,?,?,?) ",
    
    [req.body.CODIGO_MUNICIPIO,
     req.body.NOME,
     req.body.CODIGO_UF,
     req.body.NOME_UF,
     req.body.WTIP],
    
    function(err, result){
        if (err){
            res.status(500).json(err)
        } else {
            res.status(200).json(result)
        }
    })
})

router.get('/:id_municipio', (req, res, next) => {
    executeQuery('SELECT * FROM VIEW_MUNICIPIO WHERE NOME = ? ', [req.params.id_municipio], function(err, result){
        if (err){
            res.status(500).json(err)
        } else {
            res.status(200).json(result)
        }
    })
})

router.patch('/', (req, res, next) => {
    executeQuery('EXECUTE PROCEDURE FAZ_MUNICIPIO(?,?,?,?,?) ',
    
    [req.body.CODIGO_MUNICIPIO,
     req.body.NOME,   
     req.body.CODIGO_UF,   
     req.body.NOME_UF,   
     req.body.WTIP,
    ],

    function(err, result){
        if (err){
            res.status(500).json(err)
        } else {
            res.status(200).json(result)
        }
    })
})

router.delete('/:id_municipio', (req, res, next) => {
    executeQuery('EXECUTE PROCEDURE FAZ_MUNICIPIO(?,?,?,?,?) ',
    
    [req.params.id_municipio,
     req.body.NOME,
     req.body.CODIGO_UF,
     req.body.NOME_UF,
     req.body.WTIP,   
    ],
    
    function(err, result){
        if (err){
            res.status(500).json(err)
        } else {
            res.status(200).json(result)
        }
        console.log(err)

    })
})

module.exports = router
