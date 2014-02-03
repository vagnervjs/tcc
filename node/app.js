'use strict';

var restify = require('restify'),
	server = restify.createServer({ name: 'vagner-tcc-api' });

// Starting Server
server.listen(3000, function(){
	console.log('%s listening at %s', server.name, server.url);
});

// Plugins to fix some issues on restify
server
	// Allow the use of POST
	.use(restify.fullResponse())
	// Maps req.body to req.params
	.use(restify.bodyParser());

/* ===================== DataBase ======================= */
var Mongoose = require('Mongoose');
var db = Mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
	console.log('Conectado ao MongoDB.');

});

Mongoose.connect('mongodb://localhost/tcc');

/* ===================== Application ======================= */
var models = {},
    routes = {};

models.aluno = require('./models/aluno.js');
models.curso = require('./models/curso.js');
models.material = require('./models/material.js');

routes.aluno = require('./routes/aluno.js');
routes.curso = require('./routes/curso.js');
routes.material = require('./routes/material.js');

routes.aluno.__(server, restify, models);
routes.curso.__(server, restify, models);
routes.material.__(server, restify, models);
