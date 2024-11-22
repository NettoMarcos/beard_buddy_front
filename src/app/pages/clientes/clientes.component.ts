import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ClienteDetalhesDTO,
  ClienteService, ClienteCadastroDTO
} from 'src/app/service/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent {
  clientes: ClienteDetalhesDTO[] = [];
  clienteSelecionado!: ClienteDetalhesDTO | null;
  formEdicao!: FormGroup;
  formCadastro!: FormGroup;
  loading: boolean = false;
  exibirDialogEditar: boolean = false;
  exibirDialogDeletar: boolean = false;
  exibirDialogConfirmacaoEdicao: boolean = false;
  exibirDialogCadastro: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.exibirDialogConfirmacaoEdicao = false;
    this.exibirDialogDeletar = false;
    this.exibirDialogEditar = false;
    this.carregarClientes();
    this.inicializarFormEdicao();
    this.inicializarFormCadastro();
    this.formCadastro.reset();
    this.exibirDialogCadastro = false;
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
      },
    });
  }

  inicializarFormEdicao(): void {
    this.formEdicao = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      dataNascimento: ['', Validators.required],
    });
  }

  abrirDialogEditar(cliente: ClienteDetalhesDTO): void {
    this.clienteSelecionado = { ...cliente };
    this.formEdicao.patchValue(this.clienteSelecionado);
    this.exibirDialogEditar = true;
  }

  fecharDialogEditar(): void {
    this.exibirDialogEditar = false;
    if (this.formEdicao) {
      this.formEdicao.reset();
    }
  }

  confirmarEdicao(): void {
    if (this.formEdicao.valid && this.clienteSelecionado) {
      const clienteAtualizado = {
        ...this.clienteSelecionado,
        ...this.formEdicao.value,
      };
      this.clienteService.atualizarCliente(clienteAtualizado).subscribe({
        next: () => {
          this.carregarClientes();
          this.fecharDialogEditar();
        },
        error: (err) => {
          console.error('Erro ao atualizar cliente:', err);
        },
      });
    }
  }

  abrirDialogDeletar(cliente: ClienteDetalhesDTO): void {
    this.clienteSelecionado = cliente;
    this.exibirDialogDeletar = true;
  }

  fecharDialogDeletar(): void {
    this.exibirDialogDeletar = false;
  }

  confirmarDelecao(): void {
    if (this.clienteSelecionado) {
      this.clienteService.excluirCliente(this.clienteSelecionado.id).subscribe({
        next: () => {
          this.carregarClientes();
          this.fecharDialogDeletar();
        },
        error: (err) => {
          console.error('Erro ao excluir cliente:', err);
        },
      });
    }
  }

  fecharDialogConfirmacaoEdicao(): void {
    this.exibirDialogConfirmacaoEdicao = false;
  }

  salvarEdicao(): void {
    // Atualizar o cliente com os dados do formulário
    if (this.formEdicao.valid && this.clienteSelecionado) {
      const clienteAtualizado = {
        ...this.clienteSelecionado,
        ...this.formEdicao.value,
      };

      // Chamar o serviço para atualizar o cliente
      this.clienteService.atualizarCliente(clienteAtualizado).subscribe({
        next: () => {
          this.carregarClientes();
          this.fecharDialogConfirmacaoEdicao();
          this.fecharDialogEditar();
        },
        error: (err) => {
          console.error('Erro ao atualizar cliente:', err);
        },
      });
    }
  }

  abrirDialogCadastro(): void {
    this.formCadastro.reset();
    this.exibirDialogCadastro = true;
  }

  // Método para fechar a caixa de diálogo de cadastro
  fecharDialogCadastro(): void {
    this.exibirDialogCadastro = false;
  }

  // Método para salvar o novo cliente
  cadastrarCliente(): void {
    // Verifica se os campos do formulário são válidos
    if (this.formCadastro.invalid) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }
    const cliente: ClienteCadastroDTO = {
      nome: this.formCadastro.value.nome,
      cpf: this.formCadastro.value.cpf,
      telefone: this.formCadastro.value.telefone,
      dataNascimento: this.formCadastro.value.dataNascimento || null, 
    };

    this.exibirDialogCadastro = false;
    this.formCadastro.reset();
    this.carregarClientes();
    this.clienteService.cadastrarCliente(cliente).subscribe({
      next:() =>{
        this.carregarClientes();
      }
    , error:(err) =>{
      console.error('Erro ao cadastrar cliente', err);
    }
    });
  }

  // Inicializa o formulário de cadastro
  inicializarFormCadastro(): void {
    this.formCadastro = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required ],
      telefone: [''],
      dataNascimento: ['', ],
    });
  }
}

