const mongoose = require('mongoose')

const esquema = mongoose.Schema({

    usuario: {type: mongoose.ObjectId, ref: 'Usuario', required: true},
    nomeServ: {type: String, required: true},
    categoria: [{
        type: String,
        required: true,
        enum: ['Construção', 'Pintura', 'Acabamento']
    }],
    img: {type: String, required: true},
    descricao: {type: String, required: true},
    preco: {type: Number, required: true}
    
   
})

/*
    Parâmetros de método mongoose.model()
    1º Nome do modelo (sempre igual ao nome do arquivo)
    2º Estrutura (esquema) do modelo
    3º Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no mongodb
*/

module.exports = mongoose.model('AnuncioServ', esquema, 'anuncioServs')