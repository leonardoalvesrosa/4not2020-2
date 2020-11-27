import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
    // Nome da entidade no plural
    chats : any = [];

    displayedColumns: string[] = ['nome_recp', 'nome_dest', 'conteudo', 'data', 'hora', 'editar', 'excluir'];

    // Injeção de dependência ou inversão de controle
     constructor(
      private chatSrv : ChatService,
      private snackBar : MatSnackBar
    ) { }

   

    async ngOnInit() {
        this.chats = await this.chatSrv.listar();
        console.log(this.chats);
    }
    
    async excluir(id: string) {
        if(confirm('Deseja realmente excluir?')) {
            alert('Vai excluir o registro com id=' + id);
             try {
                await this.chatSrv.excluir(id)
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
