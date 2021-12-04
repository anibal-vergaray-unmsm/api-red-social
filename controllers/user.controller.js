'use strict'

var bcrypt = require('bcrypt-nodejs');
var fs = require('fs'); //permite trabajar con archivos
var path = require('path'); //permite trabajar con rutas de ficheros

var User = require('../models/user');

//REGISTRO
function saveUser(req, res) {
    var params = req.body; //para recoger los parámetros de la request(los campos que lleguen por post)
    var user = new User(); //creamos un objeto del modelo
    console.log(params);
    if (params.name && params.surname && params.email && params.password) {
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.roles = params.roles;
        user.image = null;

        //CONTROLAR USUARIOS DUPLICADOS,
        User.find(
                { email: user.email.toLowerCase() }, //si el email ya existe en la bd
        ).exec((err, users) => {
            if (err) { //si existe algún error
                return res.status(500).send({ message: 'Error en la petición del usuarios' })
            }
            if (users && users.length >= 1) { //existen los usuarios repetidos
                return res.status(200).send({ message: 'El usuario que intenta registrar, ya existe' })
            } else {
                //CIFRAR EL PASSWORD Y GUARDAR LOS DATOS
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash;
                    user.save((err, userStored) => { //error,usuario guardado en la bd
                        if (err) {
                            return res.status(500).send({
                                message: err.message
                            });
                        }
                        if (userStored) { //si el usuario llega correctamente
                            res.status(200).send({
                                user: userStored //devuelve todo el usuario enviado
                            });
                        } else {
                            res.status(500).send({
                                message: 'No se ha podido registrar el usuario'
                            });
                        }
                    });
                });
            }
        });

    } else {
        res.status(500).send({
            message: 'Campos incorrectos'
        });
    }
}

//LOGIN
function loginUser(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                    if (check) { //si es correcto
                            //devolver datos de usuario
                            //no devolveremos el password
                            user.password = undefined;
                            return res.status(200).send({ user });
                    } else {
                        return res.status(404).send({ message: 'El usuario no se ha podido identificar' });
                    }
                }) //password por parámetro, password en la bd
        } else {
            return res.status(404).send({ message: 'El usuario no se ha podido identificar!!' });
        }
    });
}

//conseguir datos de un usuario
function getUser(req, res) {
    
    var userId = req.params.id; //los datos que vienen por URL están en params, los datos por post o put es BODY
    
    return User.findById(userId, function(err, users){
        if (err) {
            return res.status(500).json({ message: 'Error en la petición' });
        }
        return res.json(users);
    });
}

//Devolver un listado de usuarios paginado
function getUsers(req, res) {

    return User.find({}, function(err, users){
        if (err) {
            return res.status(500).json({ message: 'Error en la petición' });
        }
        return res.json(users);
    });
}


//ACTUALIZAR UN USUARIO
function updateUser(req, res) {

    var userId = req.params.id;
    var update = req.body;


    //borrar la propiedad password
    delete update.password; //borra la propiedad password del objeto

    if (userId != req.user.sub) { //Si userId de la URL es diferente al del usuario autenticado
        return res.status(500).send({ message: 'No tienes permiso para actualizar los datos del usuario' });
    }

    User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => { //para que nos devuelva el objeto actualizado {new:true}
        if (err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if (!userUpdated) {
            return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
        } else {
            return res.status(200).send({ user: userUpdated });
        }
    });

}

//SUBIR ARCHIVOS DE IMAGEN/AVATAR DE USUARIO
function uploadImage(req, res) {
    var userId = req.params.id;

    if (req.files) {
        var file_path = req.files.image.path;
        console.log(file_path);
        var file_split = file_path.split('\\'); //cortar la dirección
        console.log(file_split);
        var file_name = file_split[2];
        console.log(file_name);

        var ext_split = file_name.split('\.');
        console.log(ext_split);
        var file_ext = ext_split[1];
        console.log(file_ext);

        if (userId != req.user.sub) { //Si userId de la URL es diferente al del usuario autenticado
            return removeFilesOfUploads(res, file_path, 'No tienes permiso para actualizar los datos del usuario');
        }

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            //Actualizar documento de usuario logueado
            User.findByIdAndUpdate(userId, { image: file_name }, { new: true }, (err, userUpdated) => {
                if (err) {
                    return res.status(500).send({ message: 'Error en la peticion' });
                }
                if (!userUpdated) {
                    return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
                } else {
                    return res.status(200).send({ user: userUpdated });
                }
            })

        } else {
            //en caso la extensión sea mala
            return removeFilesOfUploads(res, file_path, 'Extensión no válida');
        }

    } else {
        return res.status(200).send({ message: 'No se han subido imagenes' });
    }
}

function removeFilesOfUploads(res, file_path, message) {
    fs.unlink(file_path, (err) => { //unlink para eliminar - borrado de fichero
        return res.status(200).send({ message: message });
    });
}

function getImageFile(req, res) {
    var image_file = req.params.imageFile;
    var path_file = './uploads/users/' + image_file;

    fs.exists(path_file, (exists) => {
        if (exists) { //si existe
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'No existe la imagen' });
        }
    })
}


//para exportar las funciones
module.exports = {
    saveUser,
    loginUser,
    getUser,
    getUsers,
    updateUser,
    uploadImage,
    getImageFile
}