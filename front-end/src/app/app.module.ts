import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './ui/principal/principal.component';
import { HeaderBarComponent } from './ui/header-bar/header-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    HeaderBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
