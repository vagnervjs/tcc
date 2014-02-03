var Mongoose = require('Mongoose'),
    Schema = Mongoose.Schema,
    mongo = require('mongodb'),
    BSON = mongo.BSONPure;

var alunoSchema = new Schema({
    nome: {type: String, default: ''},
    curso: {type: Array, default: []},
    turma: {type: Array, default: []}
});

alunoSchema.statics.random = function(cb) {
    var rand = Math.floor(Math.random() * 350937);
    this.find().limit(-1).skip(rand).exec(cb);
};

var Aluno = Mongoose.model('Aluno', alunoSchema);

module.exports = {
    save: function(req, res, restify){
        var newAluno = new Aluno({
            nome: req.params.nome,
            curso: [],
            turma: []
        });

        newAluno.save(function(err, newAluno){
            if (err) { res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors))); }

            console.log(req.params.nome);
            res.send(req.params.nome);
            // res.send(newAluno);
        });
    },

    get: function(req, res, restify) {
        if(req.params.id === undefined){
            Aluno.find(function(err, alunos) {
                res.send(alunos);
            });
        } else {
            Aluno.findOne({_id: BSON.ObjectID(req.params.id)}, function(err, aluno) {
                if (err) { res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors))); }

                if (aluno) {
                    res.send(aluno);
                    console.log(aluno);
                } else {
                    res.send(404);
                    console.log('404');
                }
            });
        }
    },

    getrandom: function(res) {
        Aluno.random(function(err, aluno) {
            console.log(aluno);
            res.send(200);
        });
    },

    update: function(req, res, restify){
        Aluno.findOne({_id: BSON.ObjectID(req.params.id)}, function(err, aluno) {
            if (err) { res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors))); }

            if (aluno) {
                Aluno.update({_id: BSON.ObjectID(req.params.id)}, {nome: req.params.nome}, function(err) {
                    if (err) {
                        res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors)));
                    } else {
                        console.log(req.params.nome);
                        res.send(req.params.nome);
                        // res.send(200);
                    }
                });
            } else {
                res.send(404);
            }
        });
    },

    delete: function(req, res, restify){
        Aluno.remove({_id: BSON.ObjectID(req.params.id)}, function (err) {
            if (err) {
                res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors)));
            } else {
                res.send(200);
            }
        });
    },

    curso: function(req, res, restify){
        Aluno.findOne({_id: BSON.ObjectID(req.params.id)}, function(err, aluno) {
            if (err) { res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors))); }

            if (aluno) {
                Aluno.update({_id: BSON.ObjectID(req.params.id)}, {$pushAll: {curso: [req.params.curso]}}, function(err) {
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

    turma: function(req, res, restify){
        Aluno.findOne({_id: BSON.ObjectID(req.params.id)}, function(err, aluno) {
            if (err) { res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors))); }

            if (aluno) {
                Aluno.update({_id: BSON.ObjectID(req.params.id)}, {$pushAll: {turma: [req.params.turma]}}, function(err) {
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
    }
};
