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

const AnuncioServ = require('../models/AnuncioServ');

const controller = {};   // Objeto vazio

// Operação CREATE, função novo()
// Sempre que usar o AWAIT (espera o processo finalizar) usar o ASYNC no parâmetro da função
controller.novo = async (req, res) => {
    // Usa os dados que chegam dentro do body da requição
    // e os envia o BD para a criação de um novo objeto
    try {
        await AnuncioServ.create(req.body);
        // HTTP 201: Created
        res.status(201).end();
    }
    catch(erro) {
        console.log(erro);
        // HTTP 500: Internal Server Error
        res.status(500).send(erro);
    }
    
}

// Operação RETRIVE (all), função listar()
controller.listar = async (req, res) => {
    try {
        // Traz todos os cursos cadastrados
        let dados = await AnuncioServ.find()
            .populate('curso', 'nome') //somente o atributo nome
            .populate('professor') // todos os atributos
            .populate('sala_aula', 'nome capacidade') //somente nome e capacidade
        res.send(dados);  // Vai com status HTTP 200: OK
    }
    catch(erro) {
        console.log(erro);
        res.status(500).send(erro);
    }
    
}

// Operação RETRIVE (one), função obterUm()
controller.obterUm = async (req, res) => {
    try {
        // capturando o paramêtro id da url
        const id = req.params.id
        let obj = await AnuncioServ.findById(id)

        //Objeto existe e foi encontrado
        if(obj) res.send(obj) //HTTP 200
        //Não encontrado
        else res.status(404).end() //HTTP 404: Not found
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}


// Operação UPDATE, função atualizar()
controller.atualizar = async (req, res) => {
   try {
    //isolar o _id do objeto que está sendo alterado
    const id = req.body._id

    //Busca e substituição do conteúdo do objeto
    let ret = await AnuncioServ.findByIdAndUpdate(id, req.body)

    //Se encontrou e atualizou, retornamos HTTP 204: No content
    if(ret) res.status(204).end()

    //Não encontrou o objeto para ser alterado, retorno HTTP 404: Not found
    else res.status(404).end()
    }
    catch(erro) {
        console.log(erro)
        res.status(500).send(erro)
    }
}

//Operação DELETE, função excluir()
controller.excluir = async (req, res) => {
    try {
    //Isolando o id
    const id = req.body._id

    //Busca pelo id e exclusão
    let ret = await AnuncioServ.findByIdAndDelete(id)

    //Encontrou e excluiu, HTTP 204: No content
    if(ret) res.status(204).end()
    //Não encontrou, HTTP 404: Not found
    else res.status(404).end()
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}
module.exports = controller;