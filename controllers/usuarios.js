const { response } = require('express');
const bcryptjs = require('bcryptjs');

// Instancias de mi modelo, por eso empezar con mayusculas
const Usuario = require('../models/usuario');

const usuariosGet =  async(req = request, res = response) => {

    //const { q , nombre = 'no name', apikey } = req.query;

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true};
 
    const [total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(403).json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body; // { google, ...resto }
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save(); //(10) Guarda el usuario creado

    res.json({
        usuario
    })
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO Validar contra base de datos (id)

    if(password){
          // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.status(403).json(usuario) //para ver en consola lo actualizado
    
}

const usuariosPatch =  (req, res = response) => {
    res.status(403).json({
        msg: 'patch API - fase controlador'
    })
}

const usuariosDelete =  async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);
    
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    
    res.json(usuario);
    //res.status(403).json({ id })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}