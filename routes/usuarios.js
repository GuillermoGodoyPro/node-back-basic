
const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role')

const {validarCampos} = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste } = require('../helpers/db-validators');
 
const { 
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
    
} = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet)

router.post('/',[
    check( 'nombre', 'Nombre no permitido - minimo 3 caracteres ').trim().isLength({ min: 3 }).not().isEmpty(),
    check( 'password', 'minimo 6 caracteres ').trim().isLength({ min: 6 }).not().isEmpty(),
    check( 'correo', 'El correo no es válido').isEmail(),
    check( 'correo').custom( emailExiste ),
    //check( 'rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ), // (rol) => esRoleValido(rol)
    validarCampos
],usuariosPost)

router.put('/:id', usuariosPut)

router.patch('/', usuariosPatch)

router.delete('/', usuariosDelete)





module.exports = router;