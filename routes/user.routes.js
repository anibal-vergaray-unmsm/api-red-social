'use strict'

var express = require('express');

var { saveUser, loginUser, getUser, getUsers, updateUser } = require('../controllers/user.controller');

var api = express.Router(); // metodos http

const multer = require("multer");
const upload = multer({ dest: './uploads/users' });

var baseEndpoint = '/users';

// get
api.get(baseEndpoint + '/:id', getUser); //compruebo si el usuario autentcado sigue al usuario pasado por parámetro "id"
api.get(baseEndpoint, getUsers); 

// post
api.post('/login', loginUser);   
api.post(baseEndpoint, saveUser);

// put
api.put(baseEndpoint + '/:id',upload.single("image"), updateUser);

module.exports = api;