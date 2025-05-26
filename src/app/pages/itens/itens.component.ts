import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoAtualizarDTO, ProdutoCadastroDTO, ProdutoDetalhesDTO, ProdutoService } from 'src/app/service/produto.service';
import { ServicoAtualizarDTO, ServicoCadastroDTO, ServicoDetalhesDTO, ServicoService } from 'src/app/service/servico.service';

@Component({
  selector: 'app-itens',
  standalone: false,
  templateUrl: './itens.html',
  styleUrls: ['./itens.scss']
})
export class ItensComponent {
  produtos: ProdutoDetalhesDTO[] = [];
  servicos: ServicoDetalhesDTO[] = [];
  formCadastroServico!: FormGroup;
  formEditarServico!: FormGroup;
  exibirDialogCadastroServico: boolean = false;
  exibirDialogEditarServico: boolean = false;
  id?: number;
  servicoSelecionado!: ServicoDetalhesDTO | null;
  exibirDialogoConfirmacaoEdicaoServico: boolean = false;
  exibirDialogDeletarServico: boolean = false;
  exibirDialogCadastroProduto: boolean = false;
  formCadastroProduto!: FormGroup;
  formEditarProduto!: FormGroup;
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
    this.iniciarFormEditarServico();
    this.iniciarFormEditarProduto();
  }

  carregarProdutos(): void {
    this.produtoService.listarProdutos().subscribe(data => {
      this.produtos = data || [];
    });
  }

  carregarServicos(): void {
    // Substitua pela lógica de carregamento de serviços
    this.servicoService.listarServicos().subscribe(data => {
      this.servicos = data || [];
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
  
 iniciarFormEditarServico() {
  this.formEditarServico = this.fb.group({
    id: [''],
    nome: [''],
    preco: [''],
    valorEmPontos: ['']
  });
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
    this.formEditarServico.patchValue(servico);
    this.exibirDialogEditarServico = true;
  }

  fecharDialogEditarServico() {
    this.exibirDialogEditarServico = false;
  }


  atualizarServico() {
    console.log(this.formEditarServico.value)
   
      const servicoAtualizado: ServicoAtualizarDTO = {
        id: this.formEditarServico.value.id,
        nome: this.formEditarServico.value.nome,
        preco: this.formEditarServico.value.preco,
        valorEmPontos: this.formEditarServico.value.valorEmPontos
      };

      
      
      this.servicoService.atualizarServico(servicoAtualizado).subscribe({
        next: () => {
          this.carregarServicos();
          this.fecharDialogEditarServico();
          this.exibirDialogoConfirmacaoEdicaoServico = false;
        },
        error: (err) => {
          console.error('Erro ao atualizar serviço: ', err);
        }
      })
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

  //Funções para produtos

  abrirDialogoCadastrarProduto() {
    this.exibirDialogCadastroProduto = true;
  }

  iniciarFormCadastroProduto() {
    this.formCadastroProduto = this.fb.group({
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      valorComprado: ['', Validators.required],
      estoque: ['',Validators.required],
      valorEmPontos: ['',]
    })
  }
  iniciarFormEditarProduto() {
    this.formEditarProduto = this.fb.group({
      id: [''],
      nome: [''],
      preco: [''],
      valorComprado: [''],
      estoque: [''],
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
      valorEmPontos: this.formCadastroProduto.value.valorEmPontos,
      estoque: this.formCadastroProduto.value.estoque,
      valorComprado: this.formCadastroProduto.value.valorComprado 
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
  if (!this.formEditarProduto) {
    this.iniciarFormEditarProduto();
  }
  
  this.formEditarProduto.patchValue(produto);
  
  this.exibirDialogoEditarProduto = true;
}

  fecharDialogEditarProduto(){
    this.exibirDialogoEditarProduto = false;
  }

  atualizarProduto(){
      const produtoAtualizado : ProdutoAtualizarDTO = {
        id: this.formEditarProduto.value.id,
        nome: this.formEditarProduto.value.nome,
        preco: this.formEditarProduto.value.preco,
        valorComprado: this.formEditarProduto.value.valorComprado,
        estoque: this.formEditarProduto.value.estoque,
        valorEmPontos: this.formEditarProduto.value.valorEmPontos
      };
      
      this.produtoService.atualizarProduto(produtoAtualizado).subscribe({
        next: (res) =>{
          console.log(res)
          this.carregarProdutos();
          this.fecharDialogConfirmarEdicaoProduto();
          this.fecharDialogEditarProduto();
        },
        error: (err) =>{
          console.error('Erro ao atualizar produto: ', err)
        }
      });
  }

  fecharDialogConfirmarEdicaoProduto(){
    this.exibirDialogoConfirmarEditarProduto = false;
  }
}