const mongoose = require('mongoose')

const esquema = mongoose.Schema({

    usuarioEnv: {type: mongoose.ObjectId, ref: 'Usuario', required: true},
    usuarioRec: {type: mongoose.ObjectId, ref: 'Usuario', required: true},
    conteudo: {type: String, required: true},
    data: {type: Date},
    hora: {type: String}
})

/*
    Parâmetros de método mongoose.model()
    1º Nome do modelo (sempre igual ao nome do arquivo)
    2º Estrutura (esquema) do modelo
    3º Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no mongodb
*/

module.exports = mongoose.model('Chat', esquema, 'chat')