module.exports = {
    __: function(server, restify, md){
        server.post('/material/save', function(req, res, next){
            if(!req.params.titulo || !req.params.id ||  !req.params.desc || !req.params.tipo){
                return next(new restify.InvalidArgumentError('Dados insuficientes.'));
            }
            md.material.save(req, res, restify);
        });

        server.post('/material/delete', function(req, res, next){
            if(!req.params.id){
                return next(new restify.InvalidArgumentError('Dados insuficientes.'));
            }
            md.material.delete(req, res, restify);
        });

        server.post('/material/get', function(req, res){

            md.material.get(req, res, restify);
        });

        server.post('/material/update', function(req, res, next){
            if(!req.params.id){
                return next(new restify.InvalidArgumentError('Dados insuficientes.'));
            }
            md.material.update(req, res, restify);
        });

        server.post('/material/disicplina', function(req, res, next){
            if(!req.params.id || !req.params.turma || !req.params.disciplina){
                return next(new restify.InvalidArgumentError('Dados insuficientes.'));
            }
            md.material.disicplina(req, res, restify);
        });
    }
};
