'use strict'

var express = require('express');

var { saveUser, loginUser, getUser, getUsers, updateUser, uploadImage, getImageFile } = require('../controllers/user.controller');

var api = express.Router(); // metodos http

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users' })

var baseEndpoint = '/users';

// get
api.get(baseEndpoint + '/:id', getUser); //compruebo si el usuario autentcado sigue al usuario pasado por parámetro "id"
api.get(baseEndpoint + '/:page?', getUsers); // paginable
api.get(baseEndpoint + '?image=:imageFile', getImageFile);

// post
api.post('/login', loginUser);   
api.post(baseEndpoint, saveUser);
api.post(baseEndpoint + '/upload-image/:id', [md_upload], uploadImage); // subir foto

// put
api.put(baseEndpoint + '/:id', updateUser);

module.exports = api;