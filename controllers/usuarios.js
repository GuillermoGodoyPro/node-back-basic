const { response } = require('express');


const usuariosGet =  (req = request, res = response) => {

    const { q , nombre = 'no name', apikey } = req.query;

    res.status(403).json({
        msg: 'get API - fase controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPost =  (req, res = response) => {

    const { nombre, edad } = req.body;

    res.status(200).json({
        msg: 'post API - fase controlador',
        nombre,
        edad
    })
}

const usuariosPut =  (req, res = response) => {

    const { id } = req.params;

    res.status(403).json({
        msg: 'put API - fase controlador',
        id
    })
}

const usuariosPatch =  (req, res = response) => {
    res.status(403).json({
        msg: 'patch API - fase controlador'
    })
}

const usuariosDelete =  (req, res = response) => {
    res.status(403).json({
        msg: 'delete API - fase controlador'
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}