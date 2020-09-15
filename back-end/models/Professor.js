const mongoose = require('mongoose');

const esquema = mongoose.Schema({
    // required = obrigatório
    // enum = cria um conjunto de valores aceitos

    nome: {
        type: String,
        required: true
    },

    formacao: {
        type: String,
        required: true
    },

    data_nascimento: {
        type: Date,
        required: true
    },

    cpf: {
        type: String,
        required: true,
        // Índice único: impede a duplicidade de CPFs no cadastro
        index: {unique: true}
    },

    rg: {
        type: String,
        required: true
    },

    valor_hora_aula: {
        type: Number,
        required: true,
        min: 15.0,
        default: 20.75
    },

    endereco: {
        type: String,
        required: true
    },

    telefone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        // Índice único: impede a duplicidade de CPFs no cadastro
        index: {unique: true}
    }
    
})


/*
    Parâmetros do método mongoose.model()
    1° -> Nome do modelo (sempre igual a nome do arquivo)
    2° -> Estrutura (esquema) do modelo
    3° -> Nome da coleção (collection) em que os objetos criados a partir
         modelo serão armazenados no MongoDB
*/

module.exports = mongoose.model('Professor', esquema, 'professores');