var Mongoose = require('Mongoose'),
    Schema = Mongoose.Schema,
    mongo = require('mongodb'),
    BSON = mongo.BSONPure;

var materialSchema = new Schema({
    titulo: {type: String, default: ''},
    id: {type: String, default: ''},
    turma: {type: Array, default: []},
    disciplina: {type: Array, default: []},
    desc: {type: String, default: ''},
    data: {type: Date, default: new Date()},
    tipo: {type: String, default: ''}
    });

var Material = Mongoose.model('Material', materialSchema);

module.exports = {
    save: function(req, res, restify){
        var newMaterial = new Material({
            titulo: req.params.titulo,
            id: req.params.id,
            turma: [],
            disciplina: [],
            desc: req.params.desc,
            tipo: req.params.tipo
        });

        newMaterial.save(function(err, newMaterial){
            if (err) { res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors))); }

            res.send(newMaterial);
        });
    },

    get: function(req, res, restify) {
        if(req.params.id === undefined){
            Material.find(function(err, materiais) {
                res.send(materiais);
            });
        } else {
            Material.findOne({_id: BSON.ObjectID(req.params.id)}, function(err, material) {
                if (err) { res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors))); }

                if (material) {
                    res.send(material);
                } else {
                    res.send(404);
                }
            });
        }
    },

    update: function(req, res, restify){
        Material.findOne({_id: BSON.ObjectID(req.params.id)}, function(err, material) {
            if (err) { res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors))); }

            var data = {
                titulo: req.params.titulo,
                $pushAll: {turma: [req.params.turma], disciplina: [req.params.disciplina]},
                desc: req.params.desc,
                tipo: req.params.tipo
            };

            if (material) {
                Material.update({_id: BSON.ObjectID(req.params.id)}, data, { upsert: true }, function(err) {
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
        Material.remove({_id: BSON.ObjectID(req.params.id)}, function (err) {
            if (err) {
                res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors)));
            } else {
                res.send(200);
            }
        });
    },

    disicplina: function(req, res, restify){
        Material.findOne({id: req.params.id}, function(err, material) {
            if (err) { res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors))); }

            if (material) {
                Material.update({id: req.params.id}, {$pushAll: {turma: [req.params.turma], disciplina: [req.params.disciplina]}}, {upsert: true}, function(err) {
                    if (err) {
                        res.send(new restify.InvalidArgumentError(JSON.stringify(err.errors)));
                    } else {
                        res.send(req.params.disciplina);
                    }
                });
            } else {
                res.send(404);
            }
        });
    },
};
