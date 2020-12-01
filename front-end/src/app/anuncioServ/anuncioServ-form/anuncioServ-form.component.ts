  
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnuncioServService } from '../anuncioServ.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/usuario.service';

@Component({
  selector: 'app-anuncioServ-form',
  templateUrl: './anuncioServ-form.component.html',
  styleUrls: ['./anuncioServ-form.component.scss']
})
export class AnuncioServFormComponent implements OnInit {

  // Variável para armazenar os dados do registro
  anuncioServ : any = {}  // Objeto vazio, nome no SINGULAR

  title : string = 'Novo Anúncio'

  usuarios : any = []

  categorias : any = [
    { val:'Construção' },
    { val:'Pintura' },
    { val:'Acabamento' }
  ]
  
  constructor(
    private anuncioServSrv : AnuncioServService,
    private usuarioSrv : UsuarioService,
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
        this.anuncioServ = await this.anuncioServSrv.obterUm(this.actRoute.snapshot.params['id'])
        // 2) Mudar o título da página
        this.title = 'Editando Anúncio'
      }
      catch(erro) {
        console.log(erro)
        this.snackBar.open('ERRO: não foi possível carregar dados para edição.',
          'Que pena!', { duration: 5000 })
      }
    }
    // Carrega as listagens das entidades relacionadas
    this.carregarDados()
  }

  async carregarDados() {
    try {
      this.usuarios = await this.usuarioSrv.listar()
    }
    catch(erro) {
      console.log(erro)
      this.snackBar.open(`ERRO: não foi possível carregar todos os dados 
        necessários para a página.`, 'Que pena', { duration: 5000 })
    }
  }

  async salvar(form: NgForm) {
    if(form.valid) {
      try {
        // 1) Salvar os dados no back-end
        // Se o anuncioServ já existir (caso de edição), ele já terá
        // o atributo _id
        if(this.anuncioServ._id) {
          await this.anuncioServSrv.atualizar(this.anuncioServ) // Atualização
        }
        else {
          await this.anuncioServSrv.novo(this.anuncioServ)
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

}
