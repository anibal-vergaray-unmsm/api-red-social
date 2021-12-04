'use strict'

const express = require('express');
const app = express(); //instancia de express
const cors = require('cors');

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//export
module.exports = app;