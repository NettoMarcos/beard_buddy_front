import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NovaVendaComponent } from './pages/nova-venda/nova-venda.component';
import { ItensComponent } from './pages/itens/itens.component';
import { FaturamentoComponent } from './pages/faturas/faturamento.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

const routes: Routes = [
  {path: 'home',
    component: HomeComponent
  },
  {path: '',
    redirectTo: 'home',
    pathMatch:'full'
  },
  {
    path: 'nova-venda',
    component: NovaVendaComponent
  },
  {
    path: 'itens',
    component: ItensComponent
  },
  {
    path: 'faturamento',
    component: FaturamentoComponent
  },
  {
    path: 'clientes',
    component: ClientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
