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
    const search = req.query.search;
    return User.find({
        $or: [
            { name: {
                $regex: search,
                $options: 'i'
                }   },
            { surname: {
                $regex: search,
                $options: 'i'
                }   },
          ]
        }
      , function(err, users){
        if (err) {
            return res.status(500).json({ message: 'Error en la petición' });
        }
        return res.json(users);
    });
}

//Actualizar usuario
function updateUser (req, res) {
    const userId = req.params.id;
    const params = req.body;
    const file = req.file;
    let userUpdated = {
        name : params.name,
        surname : params.surname,
        email: params.email
    };

    if (file) {
        const ext = path.extname(file.originalname).toLowerCase();
        const targetPath = path.resolve(`./uploads/users/${file.filename}${ext}`);

        if (ext == '.png' || ext == '.jpg' || ext == '.jpeg' || ext == '.gif') {
            userUpdated = {...userUpdated, image: file.filename+ext}
            fs.renameSync(file.path, targetPath);
        } else {
            fs.unlink(file.path);
        }
    }

    User.findByIdAndUpdate(userId, userUpdated, (err, user) => {
        if (err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if (!user) {
            return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
        } else {
            if(userUpdated.image)
                fs.unlinkSync("uploads\\users\\"+user.image);
            
            return res.status(200).send({ message: 'Actualizado' });
        }
    })
}

module.exports = {
    saveUser,
    loginUser,
    getUser,
    getUsers,
    updateUser
}