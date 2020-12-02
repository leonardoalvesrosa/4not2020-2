const mongoose = require('mongoose')

const esquema = mongoose.Schema({

    nome: {type: String, required: true},
    cpf: {type: String, required: true},
    dataNasc: {type: Date, required: true},
    telefone: {type: String, required: true},
    cep: {type: String, required: true},
    endereco: {type: String, required: true},
    bairro: {type: String, required: true},
    cidade: {type: String, required: true},
    estado: {type: String, required: true},
    senha: {type: String, required: true}
    
})

/*
    Parâmetros de método mongoose.model()
    1º Nome do modelo (sempre igual ao nome do arquivo)
    2º Estrutura (esquema) do modelo
    3º Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no mongodb
*/

module.exports = mongoose.model('Usuario', esquema, 'usuarios')