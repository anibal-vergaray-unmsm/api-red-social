'use strict'

const express = require('express');
const app = express(); //instancia de express
const cors = require('cors');

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use(require('./routes/comment.routes'))
app.use(require('./routes/post.routes'))
app.use(require('./routes/user.routes'))

//export
module.exports = app;