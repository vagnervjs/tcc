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
            var newCurso = 'Curso crs'+ i,
                cursoId = 'curso'+ i;

            request.post(
                'http://127.0.0.1:3000/curso/save',
                { form: { nome: newCurso, cursoid: cursoId, } }, fn
            );
            console.log(newCurso);
        }
    }
};
