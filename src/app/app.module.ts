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
import { DividerModule } from 'primeng/divider';


import { NovaVendaComponent } from './pages/nova-venda/nova-venda.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItensComponent } from './pages/itens/itens.component';
import { FaturamentoComponent } from './pages/faturas/faturamento.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

//pipes
import { CpfPipe } from './shared/pipes/cpf.pipe';
import { TelefonePipe } from './shared/pipes/telefone.pipe';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuddyChatComponent } from './components/buddy-chat/buddy-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    BuddyChatComponent,
    FooterComponent,
    NovaVendaComponent,
    ItensComponent,
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
    InputNumberModule,
    DividerModule,
    CpfPipe,
    TelefonePipe,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
