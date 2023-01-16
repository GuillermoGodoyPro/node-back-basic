const { request, response } = require("express")


const esAdminRole = (req = request, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg:'Se intenta verificar el rol sin validar token primero'
        })
    }
    req.usuario

    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${ nombre } no es admin - No autorizado`
        })
    }


    next();
}

const tieneRole = ( ...roles ) =>{

    return( req = request, res = response, next ) =>{
        if(!req.usuario){
            return res.status(500).json({
                msg:'Se intenta verificar el rol sin validar token primero'
            })
        }
        //console.log(roles, req.usuario.rol); 

        if(!roles.includes( req.usuario.rol )){
            return res.status(401).json({
                msg: `El servicio requiere uno de los siguientes roles ${roles}`
            })
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}