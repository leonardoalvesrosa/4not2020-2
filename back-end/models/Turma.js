const mongoose = require('mongoose');

const esquema = mongoose.Schema({
    // required = obrigatório
    // enum = cria um conjunto de valores aceitos

    nome: {
        type: String,
        required: true
    },

    data_inicial: {
        type: Date,
        required: true
    },

    data_final: {
        type: Date,
        required: true,
        validate: {
            validator: function(valor) {
                return valor >= this.data_inicial;
            },
            message: () => 'A data final deve ser maior ou igual à data inicial.'
        }
    },

    dias_semana: [{
        type: String,
        required: true,
        enum: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']
    }],

    // Valores que usam apenas a parte de hora de uma data
    // são manipulados mais facilmente como string
    horario_inicial: {
        type: String, 
        requied: true
    },

    horario_final: {
        type: String, 
        requied: true
    },

    curso: {
        type: mongoose.ObjectId, ref: "Curso", required: true
    },

    professor: {
        type: mongoose.ObjectId, ref: "Professor", required: true
    },

    sala_aula: {
        type: mongoose.ObjectId, ref: "SalaAula", required: true
    }

    
})


/*
    Parâmetros do método mongoose.model()
    1° -> Nome do modelo (sempre igual a nome do arquivo)
    2° -> Estrutura (esquema) do modelo
    3° -> Nome da coleção (collection) em que os objetos criados a partir
         modelo serão armazenados no MongoDB
*/

module.exports = mongoose.model('Turma', esquema, 'turmas');