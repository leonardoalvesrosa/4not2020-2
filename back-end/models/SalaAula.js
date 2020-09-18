const mongoose = require('mongoose');

const esquema = mongoose.Schema({
    // required = obrigatório
    // enum = cria um conjunto de valores aceitos

    nome: {
        type: String,
        required: true
    },

    capacidade: {
        type: Number,
        default: 20
    },

    recursos_didaticos: {
        type: String
    }

    
})


/*
    Parâmetros do método mongoose.model()
    1° -> Nome do modelo (sempre igual a nome do arquivo)
    2° -> Estrutura (esquema) do modelo
    3° -> Nome da coleção (collection) em que os objetos criados a partir
         modelo serão armazenados no MongoDB
*/

module.exports = mongoose.model('SalaAula', esquema, 'sala_aula');