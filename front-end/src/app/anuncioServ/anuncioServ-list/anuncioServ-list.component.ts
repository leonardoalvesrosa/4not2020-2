import { Component, OnInit } from '@angular/core';
import { AnuncioServService } from '../anuncioServ.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-anuncioServ-list',
  templateUrl: './anuncioServ-list.component.html',
  styleUrls: ['./anuncioServ-list.component.scss']
})
export class AnuncioServListComponent implements OnInit {
    // Nome da entidade no plural
    anunciosServ : any = [];

    displayedColumns: string[] = ['usuario', 'nomeServ', 'categoria', 'preco', 'editar', 'excluir'];

    // Injeção de dependência ou inversão de controle
     constructor(
      private anuncioServ : AnuncioServService,
      private snackBar : MatSnackBar
    ) { }

   

    async ngOnInit() {
        this.anunciosServ = await this.anuncioServ.listar();
        console.log(this.anunciosServ);
    }
    
    async excluir(id: string) {
        if(confirm('Deseja realmente excluir?')) {
            alert('Vai excluir o registro com id=' + id);
             try {
                await this.anuncioServ.excluir(id)
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
