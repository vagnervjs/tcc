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
                        console.log('error');
                    }
                };

        for(i; i < 4000; i++) {
            var newTurma = 'Turma 3',
                newTurmaId = 'turma3',
                cursoId = 'curso'+ Math.floor(Math.random()*10001);

            request.post(
                'http://127.0.0.1:3000/curso/turma',
                { form: { turma: newTurma, turmaid: newTurmaId, id: cursoId} }, fn
            );
            console.log(cursoId);
        }
    }
};
