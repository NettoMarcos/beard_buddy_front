import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoCadastroDTO, ProdutoDetalhesDTO, ProdutoService } from 'src/app/service/produto.service';
import { ServicoCadastroDTO, ServicoDetalhesDTO, ServicoService } from 'src/app/service/servico.service';

@Component({
  selector: 'app-produtos-servicos',
  standalone: false,
  templateUrl: './produtos-servicos.component.html',
  styleUrls: ['./produtos-servicos.component.scss']
})
export class ProdutosServicosComponent {
  produtos: ProdutoDetalhesDTO[] = [];
  servicos: ServicoDetalhesDTO[] = [];
  formCadastroServico!: FormGroup;
  exibirDialogCadastroServico: boolean = false;
  exibirDialogEditarServico: boolean = false;
  id?: number;
  servicoSelecionado!: ServicoDetalhesDTO | null;
  exibirDialogoConfirmacaoEdicaoServico: boolean = false;
  exibirDialogDeletarServico: boolean = false;
  exibirDialogCadastroProduto: boolean = false;
  formCadastroProduto!: FormGroup;
  exibirDialogoEditarProduto: boolean = false;
  produtoSelecionado!: ProdutoDetalhesDTO;
  exibirDialogoConfirmarEditarProduto:boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private servicoService: ServicoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.carregarProdutos();
    this.carregarServicos();
    this.iniciarFormCadastroServico();
    this.iniciarFormCadastroProduto();
  }

  carregarProdutos(): void {
    this.produtoService.listarProdutos().subscribe(data => {
      this.produtos = data.content || [];
    });
  }

  carregarServicos(): void {
    // Substitua pela lógica de carregamento de serviços
    this.servicoService.listarServicos().subscribe(data => {
      this.servicos = data.content || [];
    })
  }

  abrirDialogoCadastrarServico() {
    this.exibirDialogCadastroServico = true;
  }

  iniciarFormCadastroServico() {
    this.formCadastroServico = this.fb.group({
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      valorEmPontos: ['']
    })
  }

  fecharDialogCadastrarServico() {
    this.exibirDialogCadastroServico = false;
  }

  cadastrarServico() {
    if (this.formCadastroServico.invalid) {
      alert('Por favor, preencha todos os campos corretamente.')
    }
    const servico: ServicoCadastroDTO = {
      nome: this.formCadastroServico.value.nome,
      preco: this.formCadastroServico.value.preco,
      valorEmPontos: this.formCadastroServico.value.valorEmPontos || 0
    }

    this.exibirDialogCadastroServico = false;
    this.formCadastroServico.reset();
    this.servicoService.cadastrarServico(servico).subscribe({
      next: () => {
        this.carregarServicos();
      },
      error: (err) => {
        console.error('Erro ao cadastrar serviço: ', err);
        alert('Erro ao cadastrar serviço: ' + err);
      }
    })
  }

  abrirDialogoEditarServico(servico: ServicoDetalhesDTO) {
    this.servicoSelecionado = { ...servico }
    this.formCadastroServico.patchValue(this.servicoSelecionado);
    this.exibirDialogEditarServico = true;
  }

  fecharDialogEditarServico() {
    this.exibirDialogEditarServico = false;
  }


  atualizarServico() {
    if (this.formCadastroServico.valid && this.servicoSelecionado) {
      const servicoAtualizado = {
        ...this.servicoSelecionado,
        ...this.formCadastroServico.value
      };
      this.exibirDialogoConfirmacaoEdicaoServico = false;
      this.servicoService.atualizarServico(servicoAtualizado).subscribe({
        next: () => {
          this.carregarServicos();
          this.fecharDialogEditarServico();
        },
        error: (err) => {
          console.error('Erro ao atualizar serviço: ', err);
        }
      })
    }
  }
  confirmarDelecaoServico() {
    if (this.servicoSelecionado) {
      this.servicoService.excluirServico(this.servicoSelecionado.id).subscribe({
        next:() => {
          this.carregarServicos();
          this.exibirDialogDeletarServico = false;
        }
      })
    }
  }

  abrirDialogoExcluirServico(servico: ServicoDetalhesDTO){
    this.servicoSelecionado = servico;
    this.exibirDialogDeletarServico = true;
  }

  abrirDialogoCadastrarProduto() {
    this.exibirDialogCadastroProduto = true;
  }

  iniciarFormCadastroProduto() {
    this.formCadastroProduto = this.fb.group({
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      quantidade: [''],
      valorEmPontos: ['']
    })
  }

  fecharDialogCadastrarProduto() {
    this.exibirDialogCadastroProduto = false;
  }

  cadastrarProduto() {
    if (this.formCadastroProduto.invalid) {
      alert('Por favor, preencha todos os campos corretamente.')
    }
    const servico: ProdutoCadastroDTO = {
      nome: this.formCadastroProduto.value.nome,
      preco: this.formCadastroProduto.value.preco,
      quantidade: this.formCadastroProduto.value.quantidade || 0,
      valorEmPontos: this.formCadastroProduto.value.valorEmPontos || 0
    }

    this.exibirDialogCadastroProduto = false;
    this.formCadastroProduto.reset();
    this.produtoService.cadastrarProduto(servico).subscribe({
      next: () => {
        this.carregarProdutos();
      },
      error: (err) => {
        console.error('Erro ao cadastrar produto: ', err);
        alert('Erro ao cadastrar produto: ' + err);
      }
    });
  }

  abrirDialogoEditarProduto(produto: ProdutoDetalhesDTO) {
    this.produtoSelecionado = { ...produto }
    this.formCadastroProduto.patchValue(this.produtoSelecionado);
    this.exibirDialogoEditarProduto = true;
  }

  fecharDialogEditarProduto(){
    this.exibirDialogoEditarProduto = false;
  }

  atualizarProduto(){
    if(this.formCadastroProduto.valid && this.produtoSelecionado){
      const produtoAtualizado = {
        ...this.produtoSelecionado,
        ...this.formCadastroProduto.value
      };
      console.log(produtoAtualizado)
      
      this.produtoService.atualizarProduto(produtoAtualizado).subscribe({
        next: () =>{
          this.carregarProdutos();
          this.fecharDialogConfirmarEdicaoProduto();
          this.fecharDialogEditarProduto();
        },
        error: (err) =>{
          console.error('Erro ao atualizar produto: ', err)
        }
      });
    }
  }

  fecharDialogConfirmarEdicaoProduto(){
    this.exibirDialogoConfirmarEditarProduto = false;
  }
}