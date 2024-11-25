import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import {TabViewModule} from 'primeng/tabview';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';


import { NovaVendaComponent } from './pages/nova-venda/nova-venda.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdutosServicosComponent } from './pages/produtos-servicos/produtos-servicos.component';
import { FaturamentoComponent } from './pages/faturamento/faturamento.component';
import { ClientesComponent } from './pages/clientes/clientes.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NovaVendaComponent,
    ProdutosServicosComponent,
    FaturamentoComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RadioButtonModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    MessageModule,
    ToastModule,
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    InputMaskModule,
    TabViewModule,
    PaginatorModule,
    DialogModule,
    BrowserAnimationsModule,
    InputNumberModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
