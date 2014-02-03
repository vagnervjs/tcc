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
            var updateNome = generateRandomString(8),
                updateId = '528ea35a0eeadbeb6c001466';
            request.post(
                'http://127.0.0.1:3000/aluno/update',
                { form: { nome: updateNome, id: updateId} }, fn
            );
            console.log(updateNome);
        }
    }
};

function generateRandomString(length) {
    var consonants = 'bcdfghjklmnpqrstvwxyz',
        vowels = 'aeiou',
        rand = function(limit) {
            return Math.floor(Math.random()*limit);
        },
        i, word='', length = parseInt(length,10),
        consonants = consonants.split(''),
        vowels = vowels.split('');
    for (i=0;i<length/2;i++) {
        var randConsonant = consonants[rand(consonants.length)],
            randVowel = vowels[rand(vowels.length)];
        word += (i===0) ? randConsonant.toUpperCase() : randConsonant;
        word += i*2<length-1 ? randVowel : '';
    }
    return word;
}