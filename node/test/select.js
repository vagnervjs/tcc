module.exports = {
    __: function(){
        var t = process.hrtime(),
            request = require('request'),
            i = 0,
            fn = function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        t = process.hrtime(t);
                        console.log(body);
                        console.log('==> %d.%d seconds', t[0], t[1]);
                    } else {
                        console.log(error);
                    }
                };

        for(i; i < 10000; i++) {
            var newId = '528ea2e563d126e66c0001d8';
            request.post(
                'http://127.0.0.1:3000/aluno/get',
                { form: { id: newId} }, fn
            );
            console.log(newId);
        }
    }
};