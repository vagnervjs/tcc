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
            var updatedisciplina = 'Disciplina 3',
                updateprofessor = 'Professor 03',
                updateturma = 'turma3',
                updatecurso = 'curso'+i;

            request.post(
                'http://127.0.0.1:3000/curso/disciplina',
                { form: { disciplina: updatedisciplina, professor: updateprofessor, turma: updateturma, curso: updatecurso} }, fn
            );
            console.log(updatecurso);
        }
    }
};
