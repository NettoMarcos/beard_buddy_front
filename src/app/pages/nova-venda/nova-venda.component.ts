import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';
import { FaturaCadastroDTO, FaturaService } from 'src/app/service/fatura.service';
import { ProdutoDetalhesDTO, ProdutoService } from 'src/app/service/produto.service';
import { ServicoDetalhesDTO, ServicoService } from 'src/app/service/servico.service';

@Component({
  selector: 'app-nova-venda',
  templateUrl: './nova-venda.component.html',
  styleUrls: ['./nova-venda.component.scss']
})
export class NovaVendaComponent {
  tipoOptions: { label: string, value: string }[] = [
    { label: 'Produto', value: 'produto' },
    { label: 'Serviço', value: 'servico' }
  ];

  cpfCliente: string = '';
  produtos: ProdutoDetalhesDTO[] = [];
  servicos: ProdutoDetalhesDTO[] = [];
  itensSelecionados: { id: number, nome: string, tipo: string, preco: number, qtd_venda: number, valorEmPontos: number }[] = [];
  valorTotal: number = 0;
  faturaForm: FormGroup;
  pontosCliente: number = 0;
  valorTotalEmPontos: number = 0;

  constructor(
    private produtoService: ProdutoService,
    private servicoService: ServicoService,
    private clienteService: ClienteService,
    private faturaService: FaturaService,
    private router: Router
  ) {
    this.faturaForm = new FormGroup({
      cpfCliente: new FormControl('', [Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]),
      tipo: new FormControl('produto', [Validators.required]),
      id_venda: new FormControl('', [Validators.required]),
      qtd_venda: new FormControl(1, [Validators.required,])
    });
  }

  ngOnInit(): void {
    this.carregarProdutos();
    this.carregarServicos();
  }

  carregarProdutos(): void {
    this.produtoService.listarProdutos().subscribe(response => {
      this.produtos = response.content;
    });
  }

  carregarServicos(): void {
    this.servicoService.listarServicos().subscribe(response => {
      this.servicos = response.content;
    });
  }

  adicionarItem(item: ProdutoDetalhesDTO | ServicoDetalhesDTO, tipo: string): void {
    const preco = tipo === 'produto' ? item.preco : item.preco;
    const valorEmPontos = tipo === 'produto' ? item.valorEmPontos : item.valorEmPontos
    this.itensSelecionados.push({
      id: item.id,
      nome: item.nome,
      tipo,
      preco,
      qtd_venda: 1,
      valorEmPontos
    });
    this.atualizarValorTotal();
  }

  removerItem(index: number): void {
    this.itensSelecionados.splice(index, 1);
    this.atualizarValorTotal();
  }

  atualizarValorTotal(): void {
    this.valorTotal = this.itensSelecionados.reduce(
      (total, item) => total + item.preco * item.qtd_venda,
      0
    );
    this.valorTotalEmPontos = this.itensSelecionados.reduce(
      (total, item) => total + item.valorEmPontos * item.qtd_venda, 0
    )
  }

  cadastrarFatura(): void {
    if (this.itensSelecionados.length === 0) {
      alert('Por favor, selecione ao menos um produto ou serviço.');
      return;
    }

    this.itensSelecionados.forEach(item => {
      
      const fatura: FaturaCadastroDTO = {
        cpfCliente: this.formatarCPF(this.faturaForm.value.cpfCliente),
        tipo: item.tipo.toUpperCase(),
        id_venda: item.id,
        qtd_venda: item.qtd_venda,
        pagoEmPontos: false
      };
      this.faturaService.cadastrarFatura(fatura).subscribe(response => {
        console.log(`Fatura para ${item.nome} cadastrada com sucesso!`, response);
      }, error => {
        console.error(`Erro ao cadastrar fatura para ${item.nome}`, error);
      });
    });

    this.router.navigate(['home']);
  }
  comprarComPontos(): void {
    if (this.itensSelecionados.length === 0) {
      alert('Por favor, selecione ao menos um produto ou serviço.');
      return;
    }

    this.itensSelecionados.forEach(item => {
      
      const fatura: FaturaCadastroDTO = {
        cpfCliente: this.formatarCPF(this.faturaForm.value.cpfCliente),
        tipo: item.tipo.toUpperCase(),
        id_venda: item.id,
        qtd_venda: item.qtd_venda,
        pagoEmPontos: true
      };
      this.faturaService.cadastrarFatura(fatura).subscribe(response => {
        console.log(`Fatura para ${item.nome} cadastrada com sucesso!`, response);
      }, error => {
        console.error(`Erro ao cadastrar fatura para ${item.nome}`, error);
      });
    });

    this.router.navigate(['home']);
  }

  alterarQuantidade(item: { qtd_venda: number }, delta: number): void {
    const novaQuantidade = item.qtd_venda + delta;
    if (novaQuantidade >= 1) {
      item.qtd_venda = novaQuantidade;
      this.atualizarValorTotal();
    }
  }

  itemSelecionado(id: number, tipo: string): boolean {
    return this.itensSelecionados.some(item => item.id === id && item.tipo === tipo);
  }

  getQuantidadeDisponivel(id: number, tipo: string, qtd_venda: number): boolean {
    const produto = this.produtos.find(produto => produto.id === id);
    if (produto && qtd_venda >= produto.quantidade && tipo === 'produto') {
      return true;
    }
    return false;
  }

  formatarCPF(cpf: string): string{
    const cpfSemFormato = cpf.replace(/[.-]/g, "");

    return cpfSemFormato;
  }

  buscarPontosCliente(cpf: string): void {
    const cpf_formatado = this.formatarCPF(cpf);
    this.clienteService.buscarPontos(cpf_formatado).subscribe(resp => {
      this.pontosCliente = resp.pontos;
    });
  }
}



