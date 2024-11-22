import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteDetalhesDTO, ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {
  clientes: ClienteDetalhesDTO[] = [];
  loading: boolean = false;
  visible: boolean = false;

  constructor(
    private clienteService: ClienteService,
  ) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.loading = true;
    this.clienteService.listarClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
        this.loading = false;
      }
    });
  }

  showDialog(): void {
    this.visible = true;
  }

}
