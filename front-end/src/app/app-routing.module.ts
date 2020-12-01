import { TurmaFormComponent } from './turma/turma-form/turma-form.component';
import { TurmaListComponent } from './turma/turma-list/turma-list.component';

import { CursoListComponent } from './curso/curso-list/curso-list.component';
import { CursoFormComponent } from './curso/curso-form/curso-form.component';

import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';

import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { ChatFormComponent } from './chat/chat-form/chat-form.component';

import { AnuncioProdListComponent } from './anuncioProd/anuncioProd-list/anuncioProd-list.component';
import { AnuncioProdFormComponent } from './anuncioProd/anuncioProd-form/anuncioProd-form.component';

import { AnuncioServListComponent } from './anuncioServ/anuncioServ-list/anuncioServ-list.component';
import { AnuncioServFormComponent } from './anuncioServ/anuncioServ-form/anuncioServ-form.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    // Nomes de rota no Angular (path) NÃO começam com uma barra
    { path: 'curso', component: CursoListComponent },
    { path: 'curso/novo', component: CursoFormComponent },
    { path: 'curso/:id', component: CursoFormComponent },

    { path: 'turma', component: TurmaListComponent },
    { path: 'turma/novo', component: TurmaFormComponent },
    { path: 'turma/:id', component: TurmaFormComponent },

    { path: 'usuario', component: UsuarioListComponent },
    { path: 'usuario/novo', component: UsuarioFormComponent },
    { path: 'usuario/:id', component: UsuarioFormComponent },

    { path: 'chat', component: ChatListComponent },
    { path: 'chat/novo', component: ChatFormComponent },
    { path: 'chat/:id', component: ChatFormComponent },

    { path: 'anuncioProd', component: AnuncioProdListComponent },
    { path: 'anuncioProd/novo', component: AnuncioProdFormComponent },
    { path: 'anuncioProd/:id', component: AnuncioProdFormComponent },

    { path: 'anuncioServ', component: AnuncioServListComponent },
    { path: 'anuncioServ/novo', component: AnuncioServFormComponent },
    { path: 'anuncioServ/:id', component: AnuncioServFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }