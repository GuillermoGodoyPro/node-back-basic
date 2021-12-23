const { response } = require('express');
const bcryptjs = require('bcryptjs');

// Instancias de mi modelo, por eso empezar con mayusculas
const Usuario = require('../models/usuario');

const usuariosGet =  (req = request, res = response) => {

    const { q , nombre = 'no name', apikey } = req.query;

    res.status(403).json({
        msg: 'get API - fase controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body; // { google, ...resto }
    const usuario = new Usuario({ nombre, correo, password, rol });
    
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ){
        return res.status(400).json({ 
            msg: 'Correo ya está registrado'
        })
    }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save(); // Guarda el usuario creado

    res.json({
        usuario
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