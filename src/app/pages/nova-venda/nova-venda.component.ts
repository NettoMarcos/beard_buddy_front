import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  servicos: ServicoDetalhesDTO[] = [];
  itensSelecionados: { id: number, nome:string, tipo: string, preco: number}[] = [];
  valorTotal: number = 0;
  faturaForm: FormGroup;
  
  constructor(
    private produtoService: ProdutoService,
    private servicoService: ServicoService,
    private faturaService: FaturaService,
    private router: Router
  ) {
    this.faturaForm = new FormGroup({
      cpfCliente: new FormControl('', [Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]),
      tipo: new FormControl('produto', [Validators.required]),
      pagoEmPontos: new FormControl(false),
      id_venda: new FormControl('', [Validators.required]),
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
    const preco = tipo === 'produto' ? item.preco : item.preco; // Aqui você pode adicionar lógica extra se necessário.
    this.itensSelecionados.push({
      id: item.id,
      nome: item.nome,  // Acessando o campo nome corretamente
      tipo,
      preco
    });
    this.atualizarValorTotal();
  }

  removerItem(index: number): void {
    this.itensSelecionados.splice(index, 1);
    this.atualizarValorTotal();
  }

  atualizarValorTotal(): void {
    this.valorTotal = this.itensSelecionados.reduce((total, item) => total + item.preco , 0);
  }

  cadastrarFatura(): void {
    // Verifica se há itens selecionados
    if (this.itensSelecionados.length === 0) {
      alert('Por favor, selecione ao menos um produto ou serviço.');
      return;
    }
  
    // Percorre cada item selecionado e cria uma fatura individual para cada um
    this.itensSelecionados.forEach(item => {
      const fatura: FaturaCadastroDTO = {
        cpfCliente: this.faturaForm.value.cpfCliente,
        tipo: item.tipo.toUpperCase(), // Inclui apenas o tipo do item (produto ou serviço)
        id_venda: item.id, // Inclui apenas o ID do item
        pagoEmPontos: this.faturaForm.value.pagoEmPontos
      };
  
      // Envia a fatura individual para cada item
      this.faturaService.cadastrarFatura([fatura]).subscribe(response => {
        console.log(`Fatura para ${item.nome} cadastrada com sucesso!`, response);
      }, error => {
        console.error(`Erro ao cadastrar fatura para ${item.nome}`, error);
      });
    });

    this.router.navigate(['home']);
  }
}
