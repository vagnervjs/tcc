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

        for(i; i < 4000; i++) {
            var newMaterial = 'Material '+ generateRandomString(8),
                newMaterialId = 'mt'+ i,
                newMaterialDesc = 'Descricao ' + generateRandomString(4) + ' ' + generateRandomString(5),
                newMaterialTipo = 'doc';


            request.post(
                'http://127.0.0.1:3000/material/save',
                { form: { titulo: newMaterial, id: newMaterialId, desc: newMaterialDesc, tipo: newMaterialTipo} }, fn
            );
            console.log(newMaterial);
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
