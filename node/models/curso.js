var Mongoose = require('Mongoose'),
    Schema = Mongoose.Schema,
    mongo = require('mongodb'),
    BSON = mongo.BSONPure;

var cursoSchema = new Schema({
    nome: {type: String, default: ''},
    turma: {type: Array, default: []},
    cursoId: {type: String, default: ''}
});

var Curso = Mongoose.model('Curso', cursoSchema);

module.exports = {
    save: function(req, res, restify){
        var newCurso = new Curso({
            nome: req.params.nome,
            cursoId: req.params.cursoid,
            turma: []
        });

        newCurso.save(function(err, newCurso){
            if (err) { res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors))); }

            res.send(newCurso);
        });
    },

    get: function(req, res, restify) {
        if(req.params.id === undefined){
            Curso.find(function(err, cursos) {
                res.send(cursos);
            });
        } else {
            Curso.findOne({_id: BSON.ObjectID(req.params.id)}, function(err, curso) {
                if (err) { res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors))); }

                if (curso) {
                    res.send(curso);
                } else {
                    res.send(404);
                }
            });
        }
    },

    update: function(req, res, restify){
        Curso.findOne({_id: BSON.ObjectID(req.params.id)}, function(err, curso) {
            if (err) { res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors))); }

            if (curso) {
                Curso.update({_id: BSON.ObjectID(req.params.id)}, {nome: req.params.nome}, function(err) {
                    if (err) {
                        res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors)));
                    } else {
                        res.send(200);
                    }
                });
            } else {
                res.send(404);
            }
        });
    },

    delete: function(req, res, restify){
        Curso.remove({_id: BSON.ObjectID(req.params.id)}, function (err) {
            if (err) {
                res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors)));
            } else {
                res.send(200);
            }
        });
    },

    turma: function(req, res, restify){
        Curso.findOne({cursoId: req.params.id}, function(err, curso) {
            var turma = {
                nome: req.params.turma,
                turmaId: req.params.turmaid,
                disciplina: []
            };
            if (err) { res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors))); }

            if (curso) {
                Curso.update({cursoId: req.params.id}, {$pushAll: {turma: [turma]}}, function(err) {
                    if (err) {
                        res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors)));
                    } else {
                        res.send(turma);
                    }
                });
            } else {
                res.send(404);
            }
        });
    },

    disciplina: function(req, res, restify){
        Curso.findOne({'cursoId': req.params.curso, 'turma.turmaId': req.params.turma}, {upsert: true, multi: true}, function(err, curso) {
            var disciplina = {
                nome: req.params.disciplina,
                professor: req.params.professor
            };
            if (err) { res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors))); }

            if (curso) {
                Curso.update({'cursoId': req.params.curso, 'turma.turmaId': req.params.turma}, {$pushAll: {'turma.$.disciplina': [disciplina]}}, { upsert: true }, function(err) {
                    if (err) {
                        res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors)));
                    } else {
                        res.send(disciplina);
                    }
                });
            } else {
                res.send(404);
            }
        });
    }
};
