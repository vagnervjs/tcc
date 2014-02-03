module.exports = {
    __: function(server, restify, md){
        server.post('/aluno/save', function(req, res, next){
            if(!req.params.nome){
                return next(new restify.InvalidArgumentError('Dados insuficientes.'));
            }
            md.aluno.save(req, res, restify);
        });

        server.post('/aluno/delete', function(req, res, next){
            if(!req.params.id){
                return next(new restify.InvalidArgumentError('Dados insuficientes.'));
            }
            md.aluno.delete(req, res, restify);
        });

        server.post('/aluno/get', function(req, res){

            md.aluno.get(req, res, restify);
        });

        server.post('/aluno/getrandom', function(req, res){

            md.aluno.getrandom(res);
        });

        server.post('/aluno/update', function(req, res, next){
            if(!req.params.id || !req.params.nome){
                return next(new restify.InvalidArgumentError('Dados insuficientes.'));
            }
            md.aluno.update(req, res, restify);
        });

        server.post('/aluno/curso', function(req, res, next){
            if(!req.params.id || !req.params.curso){
                return next(new restify.InvalidArgumentError('Dados insuficientes.'));
            }
            md.aluno.curso(req, res, restify);
        });

        server.post('/aluno/turma', function(req, res, next){
            if(!req.params.id || !req.params.turma){
                return next(new restify.InvalidArgumentError('Dados insuficientes.'));
            }
            md.aluno.turma(req, res, restify);
        });
    }
};