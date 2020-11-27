import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {
    // Nome da entidade no plural
    usuarios : any = [];

    displayedColumns: string[] = ['nome', 'dataNasc', 'telefone', 'cep', 'editar', 'excluir'];

    // Injeção de dependência ou inversão de controle
     constructor(
      private usuarioSrv : UsuarioService,
      private snackBar : MatSnackBar
    ) { }

   

    async ngOnInit() {
        this.usuarios = await this.usuarioSrv.listar();
        console.log(this.usuarios);
    }
    
    async excluir(id: string) {
        if(confirm('Deseja realmente excluir?')) {
            alert('Vai excluir o registro com id=' + id);
             try {
                await this.usuarioSrv.excluir(id)
                // 1) Recarregar os dados da tabela
                this.ngOnInit()
                // 2) Dar feedback para o usuário com mensagem
                this.snackBar.open('Item excluído com sucesso.', 'Entendi', {
                duration: 5000 // 5 segundos
                })
            }
            catch(erro) {
                // 3) Dar feedback de erro para o usuário
                this.snackBar.open('ERRO: não foi possível excluir este item.', 'Que pena!', {
                duration: 5000 // 5 segundos
                })
                console.log(erro)
            }
        }
    }
}
