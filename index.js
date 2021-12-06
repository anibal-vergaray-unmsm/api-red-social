'use strict'

var mongoose = require('mongoose');
var app = require('./app'); 
const PORT = 3000;
const MONGODB_URI = 'mongodb://localhost/red-social' ;

//Conexión mediante promesas
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conexión realizada correctamente!!");

        //Crear servidor
        app.listen(PORT, () => {
            console.log("Servidor corriendo en http://localhost:3000");
        })
    })
    .catch((err) => console.log(err));