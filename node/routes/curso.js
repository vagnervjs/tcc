module.exports = {
    __: function(server, restify, md){
        server.post('/curso/save', function(req, res, next){
            if(!req.params.nome){
                return next(new restify.InvalidArgumentError('Dados insuficientes.'));
            }
            md.curso.save(req, res, restify);
        });

        server.post('/curso/delete', function(req, res, next){
            if(!req.params.id){
                return next(new restify.InvalidArgumentError('Dados insuficientes.'));
            }
            md.curso.delete(req, res, restify);
        });

        server.post('/curso/get', function(req, res){

            md.curso.get(req, res, restify);
        });

        server.post('/curso/update', function(req, res, next){
            if(!req.params.id || !req.params.nome){
                return next(new restify.InvalidArgumentError('Dados insuficientes.'));
            }
            md.curso.update(req, res, restify);
        });

        server.post('/curso/turma', function(req, res, next){
            if(!req.params.id || !req.params.turma){
                return next(new restify.InvalidArgumentError('Dados insuficientes.'));
            }
            md.curso.turma(req, res, restify);
        });

        server.post('/curso/disciplina', function(req, res, next){
            if(!req.params.curso || !req.params.turma || !req.params.disciplina || !req.params.professor){
                return next(new restify.InvalidArgumentError('Dados insuficientes.'));
            }
            md.curso.disciplina(req, res, restify);
        });
    }
};
