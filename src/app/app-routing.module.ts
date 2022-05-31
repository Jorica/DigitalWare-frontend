import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturasComponent } from './main/facturas/facturas.component';
import { GestionarFacuturaComponent } from './main/facturas/gestionar-facutura/gestionar-facutura.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/facturas',
    pathMatch: 'full'
  },
  {
    path: 'facturas',
    component: FacturasComponent
  },
  {
    path: 'gestionar-factura',
    component: GestionarFacuturaComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
