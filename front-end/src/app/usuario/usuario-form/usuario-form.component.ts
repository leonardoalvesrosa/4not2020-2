  
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CepService } from 'src/app/cep/cep.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {

  // Variável para armazenar os dados do registro
  usuario : any = {}  // Objeto vazio, nome no SINGULAR

  title : string = 'Novo usuario'

  constructor(
    private usuarioSrv : UsuarioService,
    private cepSrv : CepService,
    private snackBar : MatSnackBar,
    private location : Location,
    private actRoute : ActivatedRoute
  ) { }

  async ngOnInit() {
    // Verifica se existe o parâmetro id na URL (rota)
    if(this.actRoute.snapshot.params['id']) {
      try {
        // 1) Acionar o back-end para buscar esse registro
        // e disponibilizá-lo para edição        
        this.usuario = await this.usuarioSrv.obterUm(this.actRoute.snapshot.params['id'])
        // 2) Mudar o título da página
        this.title = 'Editando usuario'
      }
      catch(erro) {
        console.log(erro)
        this.snackBar.open('ERRO: não foi possível carregar dados para edição.',
          'Que pena!', { duration: 5000 })
      }
    }
  }

  async salvar(form: NgForm) {
    if(form.valid) {
      try {
        // 1) Salvar os dados no back-end
        // Se o usuario já existir (caso de edição), ele já terá
        // o atributo _id
        if(this.usuario._id) {
          await this.usuarioSrv.atualizar(this.usuario) // Atualização
        }
        else {
          await this.usuarioSrv.novo(this.usuario)
        }
        // 2) Dar o feedback para o usuário
        this.snackBar.open('Dados salvos com sucesso.', 'Entendi',
          { duration: 5000 })
        // 3) Voltar ao componente de listagem
        this.location.back()
      }
      catch (erro) {
        console.log(erro)
        this.snackBar.open('ERRO: não foi possível salvar os dados.', 'Que pena!',
          { duration: 5000 })
      }
      
    }
  }

  voltar(form: NgForm) {
    let result = true
    // form.dirty = formulário "sujo", não salvo (via código)
    // form.touched = o conteúdo de algum campo foi alterado (via usuário)
    if(form.dirty && form.touched) {
      result = confirm('Há dados não salvos. Deseja realmente voltar?')
    }

    if(result) this.location.back()

  }


  consultaCep(form: NgForm){
    // aqui iremos consumir a API da viacep
    // recupera o valor digitando pelo usuario
    let cep = String(document.getElementById("cep"));
    // precisamos fazer uma requisição ao servidor
    let req = new XMLHttpRequest();
    // precisamos definir o local da API
    //let url = `https://viacep.com.br/ws/${cep}/json`;
 
    this.cepSrv.capturaCep(cep);

    // vamos usar o método GET para fazer a requisição
    //req.open("GET", url, true); // true porque será uma solicitação aassíncrona
    // vamos enviar a requisição
    //req.send();
    // vamos trabalhar com a resposta do servidor
    req.onload = () => {
      // recuperar o resultado
      let resultado = req.responseText;
      // transformar em JSON
      resultado = JSON.parse(resultado);
      console.log(resultado);
      // vamos jogar o resultado no formulário
      //document.getElementById('endereco').innerHTML = resultado;
      // document.getElementById('bairro').innerHTML = resultado.bairro;
      // document.getElementById('cidade').innerHTML = resultado.localidade;
      // document.getElementById('estado').innerHTML = resultado.uf;

    }
  }

}
