import { Component, OnInit } from '@angular/core';
import { format } from 'util';
import {​​​​ NgForm }​​​​ from '@angular/forms';
import { CursoService } from '../curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {​​​​ Location }​​​​ from '@angular/common';
import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.scss']
})
export class CursoFormComponent implements OnInit {

  // Variável para armazenar os dados do registro
  curso : any = {}  // Objeto vazio, nome no SINGULAR

  niveis : any = [
    { valor: 'Básico' },
    { valor: 'Intermediário' },
    { valor: 'Avançado' }
  ]

  title : string = 'Novo curso'

  constructor(
    private cursoSrv : CursoService,
    private snackBar : MatSnackBar,
    private location : Location,
    private actRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Verifica se existe o parâmetro id na URL (rota)
    if(this.actRoute.snapshot.params['id']){
      // 1) Acionar o back-end para buscar esse registro
      // e disponibilizá-lo para edição
      try{
        this.curso = await this.cursoSrv.obterUm(this.actRoute.snapshot.params['id'])
        // 2) Mudar o título da página
        this.title = 'Editando curso'
      }
      catch(erro){
        console.log(erro);
        this.snackBar.open('ERRO: não foi possível carregar dados para edição.',
         'Que pena', )
      }

    }
  }

  salvar(form: NgForm){
    if(form.valid){
      try{
        // 1) Salvar os dados no back-end
        await this.cursoSrv.novo(this.curso);
        // 2) Dar o feedback para o usuario
        this.snackBar.open('Dados salvos com sucesso.', 'Entendi',
        { duration: 5000 });
        // 3) Voltar ao componente de listagem
        this.location.back();
      }
      catch(erro){
        console.log(erro);
        this.snackBar.open('ERRO: não foi possível salvar os dados.', 'Que pena',
        { duration : 5000 })
        
      }
    }
  }
  

    voltar(form: NgForm){
      let result = true;
      // form.dirty = formulário "sujo", não salvo (via código)
      // dorm.touched = o conteúdo de algum campo foi alterado (via usuário)
      if(form.dirty && form.touched){
        result = confirm('Há dados não salvos. Deseja realmente voltar ?')
      }

      if(result) this.location.back();
      
    }
  
  }


  


        