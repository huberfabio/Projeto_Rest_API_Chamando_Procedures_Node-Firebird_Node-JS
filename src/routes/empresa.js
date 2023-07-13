const express = require('express')
const router = express.Router()

const executeQuery = require('../services/connectionFirebird')

router.get('/', (req, res, next) => {
    executeQuery("SELECT * FROM EMPRESA VIEW_EMPRESA ", function(err, result){
        if (err){
            res.status(500).json(err)
        } else {
            res.status(200).json(result)
        }
    })
})

router.post('/', (req, res, next) => {
    executeQuery("EXECUTE PROCEDURE FAZ_EMPRESA(?,?,?,?,?,?,?) ",
    
    [req.body.CODIGO_EMPRESA,
     req.body.RAZAO_SOCIAL,
     req.body.NOME_FANTASIA,
     req.body.CNPJ_CPF,
     req.body.IE_RG,
     req.body.PESSOA,
     req.body.WTIP],
    
    function(err, result){
        if (err){
            res.status(500).json(err)
        } else {
            res.status(200).json(result)
        }
    })
})

router.get('/:id_empresa', (req, res, next) => {
    executeQuery('SELECT * FROM VIEW_EMPRESA WHERE CODIGO_EMPRESA = ? ', [req.params.id_empresa], function(err, result){
        if (err){
            res.status(500).json(err)
        } else {
            res.status(200).json(result)
        }
    })
})

router.patch('/', (req, res, next) => {
    executeQuery('EXECUTE PROCEDURE FAZ_EMPRESA(?,?,?,?,?,?,?) ',
    
    [req.body.CODIGO_EMPRESA,
     req.body.RAZAO_SOCIAL,
     req.body.NOME_FANTASIA,
     req.body.CNPJ_CPF,
     req.body.IE_RG,
     req.body.PESSOA,
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

router.delete('/:id_empresa', (req, res, next) => {
    executeQuery('EXECUTE PROCEDURE FAZ_EMPRESA(?,?,?,?,?,?,?) ',
    
    [req.params.id_empresa,
     req.body.RAZAO_SOCIAL,
     req.body.NOME_FANTASIA,
     req.body.CNPJ_CPF,
     req.body.IE_RG,
     req.body.PESSOA,
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

module.exports = router