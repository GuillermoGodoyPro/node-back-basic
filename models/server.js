const express = require('express')
var cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // Rutas
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
       
        // Conectar a base de datos
        this.conectarDB();
        
        // Middlewares
        this.middlewares();
        
        // Rutas de mi app
        this.routes();
         
    }
  
    async conectarDB() {
        await dbConnection();
    }

    // Directorio público
    middlewares() {

        // CORS herramienta para configurar algunos accesos, ej whitelist o blacklist
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public'));
    }

    routes() {               
        this.app.use( this.authPath , require('../routes/auth'))
        this.app.use( this.usuariosPath , require('../routes/usuarios'))
    }

    listen() {
        this.app.listen( this.port , () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }

}



module.exports = Server;