        // Auth
        server.post('/auth', function(req, res, next){
            if(req.params.email === undefined || req.params.password === undefined){
                return next(new restify.InvalidArgumentError('Usuário ou senha em branco.'));
            }

            user.auth(req, res, restify);
        });

        // Get all users
        server.get('/user', function(req, res){
            user.list(req, res);
        });

        // Get a user by email
        server.get('/user/:email', function (req, res) {
            user.listOne(req, res, restify);
        });

        // Add new user
        server.post('/user/add', function(req, res, next){
            if(req.params.name === undefined || req.params.email === undefined || req.params.password === undefined){
                return next(new restify.InvalidArgumentError('Dados insuficientes.'));
            }

            user.add(req, res, restify);
        });

        // Remove user by email
        server.post('/user/del', function(req, res, next){
            if(req.params.email === undefined){
                return next(new restify.InvalidArgumentError('Nome precisa ser informado.'));
            }

            user.remove(req, res, restify);
        });

        // Follow a user
        server.post('/follow', function(req, res, next){
            if(req.params.email === undefined || req.params.follow === undefined){
                return next(new restify.InvalidArgumentError('Dados insuficientes.'));
            }

            user.follow(req, res, restify);
        });


        // See common friend of two users
        server.post('/friendship', function(req, res, next){
            if(req.params.email === undefined || req.params.friend === undefined){
                return next(new restify.InvalidArgumentError('Dados insuficientes.'));
            }

            user.friendship(req, res, restify);
        });

        // Simple view for test upload images
        server.get('/img', function(req, res){
            var body =
                '<form method="post" enctype="multipart/form-data" action="/img">' +
                '<p><input type="file" multiple name="uploadfile" /></p>' +
                '<p><input type="text" name="email" placeholder="email" /></p>' +
                '<p><input type="submit" value="GO" /></p>' +
                '</form>';

            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(body),
                'Content-Type': 'text/html'
            });
            res.write(body);
            res.end();
        });

        // Upload images (just for users registered)
        server.post('/img', function(req, res, next){
            if(req.params.email === undefined){
                return next(new restify.InvalidArgumentError('Dados insuficientes.'));
            }

            user.imageUpload(req, res, restify, fs);
        });