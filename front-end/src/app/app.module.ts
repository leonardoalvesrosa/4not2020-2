import { NgxMaskModule, IConfig } from 'ngx-mask';
 
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {​​​​ registerLocaleData }​​​​ from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MainToolbarComponent } from './ui/main-toolbar/main-toolbar.component';
import { MainFooterComponent } from './ui/main-footer/main-footer.component';
import { MainMenuComponent } from './ui/main-menu/main-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CursoListComponent } from './curso/curso-list/curso-list.component';
import { CursoFormComponent } from './curso/curso-form/curso-form.component';

import { TurmaListComponent } from './turma/turma-list/turma-list.component';
import { TurmaFormComponent } from './turma/turma-form/turma-form.component';

import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';

import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { ChatFormComponent } from './chat/chat-form/chat-form.component';

import { AnuncioProdListComponent } from './anuncioProd/anuncioProd-list/anuncioProd-list.component';
import { AnuncioProdFormComponent } from './anuncioProd/anuncioProd-form/anuncioProd-form.component';

import { AnuncioServListComponent } from './anuncioServ/anuncioServ-list/anuncioServ-list.component';
import { AnuncioServFormComponent } from './anuncioServ/anuncioServ-form/anuncioServ-form.component';

import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent,
    MainFooterComponent,
    MainMenuComponent,
    CursoListComponent,
    CursoFormComponent,
    TurmaListComponent,
    TurmaFormComponent,
    UsuarioListComponent,
    UsuarioFormComponent,
    ChatListComponent,
    ChatFormComponent,
    AnuncioProdListComponent,
    AnuncioProdFormComponent,
    AnuncioServListComponent,
    AnuncioServFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatMomentDateModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    // No app.module.ts, dentro seção providers
    /**** Datas em português no MatDatepicker  ****/
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ],
  bootstrap: [AppComponent]
    
})
export class AppModule { }
