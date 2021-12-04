'use strict'

var mongoose = require('mongoose');
var app = require('./app'); //variable app con toda la config de express
var port = 3000;


//Conexión mediante promesas
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/red-social', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conexión realizada correctamente!!");

        //Crear servidor
        app.listen(port, () => {
            console.log("Servidor corriendo en http://localhost:3000");
        })
    })
    .catch((err) => console.log(err));