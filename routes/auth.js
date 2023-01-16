const { Router } = require('express'); //Desestr para llamar esta fx
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { login } = require('../controllers/auth');

const router = Router();


router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );

module.exports = router;