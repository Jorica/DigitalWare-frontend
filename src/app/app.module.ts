import { LOCALE_ID, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs,'es');



import { 
  DxButtonModule,
  DxDataGridModule,
  DxPopupModule,
  DxAutocompleteModule,
  DxFormModule,
  DxNumberBoxModule,
  DxLoadIndicatorModule
 } from 'devextreme-angular';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FacturasComponent } from './main/facturas/facturas.component';
import { PopupSelectClienteComponent } from './main/componentes/popup-select-cliente/popup-select-cliente.component';
import { GestionarFacuturaComponent } from './main/facturas/gestionar-facutura/gestionar-facutura.component';

@NgModule({
  declarations: [
    AppComponent,
    FacturasComponent,
    PopupSelectClienteComponent,
    GestionarFacuturaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    DxButtonModule,
    DxDataGridModule,
    DxPopupModule,
    DxAutocompleteModule,
    DxFormModule,
    DxNumberBoxModule,
    HttpClientModule,
    DxLoadIndicatorModule
    
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
