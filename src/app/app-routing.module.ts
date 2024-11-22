import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NovaVendaComponent } from './pages/nova-venda/nova-venda.component';
import { ProdutosServicosComponent } from './pages/produtos-servicos/produtos-servicos.component';
import { FaturamentoComponent } from './pages/faturamento/faturamento.component';
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
    path: 'produtos-servicos',
    component: ProdutosServicosComponent
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
