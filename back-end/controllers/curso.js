/*

    OPERAÇÕES BÁSICAS SOBRE DADOS

    1) CREATE (criação ou inserção)
        Cria um novo objeto dentro do banco de dados

    2) RETRIEVE (recuperar ou listar)
        Obter de volta ium mais objetos preexistentes no banco de dados
    
    3) UPDATE
        Atualizar os dados de um objeto preexiste no banco de dados

    4) DELETE
        Exclusão de um objeto do banco de dados

    (C)reate + (R)etrive + (U)pdate + (D)elete = sigla CRUD

    ========================================================

    Verbos do protocolo HTTP

    Verbo             Operação
    POST              CREATE
    GET               RETRIVE
    PUT               UPDATE
    DELETE            DELETE

*/

// Controller é um conjunto de funções associadas às operações sobre dados

const Curso = require('../models/Curso');

const controller = {};   // Objeto vazio

// Operação CREATE, função novo()
// Sempre que usar o AWAIT (espera o processo finalizar) usar o ASYNC no parâmetro da função
controller.novo = async (req, res) => {
    // Usa os dados que chegam dentro do body da requição
    // e os envia o BD para a criação de um novo objeto
    try {
        await Curso.create(req.body);
        // HTTP 201: Created
        res.status(201).end();
    }
    catch(erro) {
        console.log(erro);
        // HTTP 500: Internal Server Error
        res.status(500).send(erro);
    }
    
}

module.exports = controller;