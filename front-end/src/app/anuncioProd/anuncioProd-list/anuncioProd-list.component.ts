import { Component, OnInit } from '@angular/core';
import { AnuncioProdService } from '../anuncioProd.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-anuncioProd-list',
  templateUrl: './anuncioProd-list.component.html',
  styleUrls: ['./anuncioProd-list.component.scss']
})
export class AnuncioProdListComponent implements OnInit {
    // Nome da entidade no plural
    anunciosProd : any = [];

    displayedColumns: string[] = ['usuario', 'nomeProd', 'categoria', 'modalidade', 'preco', 'qtde', 'editar', 'excluir'];

    // Injeção de dependência ou inversão de controle
     constructor(
      private anuncioProdSrv : AnuncioProdService,
      private snackBar : MatSnackBar
    ) { }

   

    async ngOnInit() {
        this.anunciosProd = await this.anuncioProdSrv.listar();
        console.log(this.anunciosProd);
    }
    
    async excluir(id: string) {
        if(confirm('Deseja realmente excluir?')) {
            alert('Vai excluir o registro com id=' + id);
             try {
                await this.anuncioProdSrv.excluir(id)
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
