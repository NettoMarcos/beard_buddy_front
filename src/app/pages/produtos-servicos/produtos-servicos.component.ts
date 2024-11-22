import { Component } from '@angular/core';
import { ProdutoDetalhesDTO, ProdutoService } from 'src/app/service/produto.service';
import { ServicoDetalhesDTO, ServicoService } from 'src/app/service/servico.service';

@Component({
  selector: 'app-produtos-servicos',
  standalone: false,
  templateUrl: './produtos-servicos.component.html',
  styleUrls: ['./produtos-servicos.component.scss']
})
export class ProdutosServicosComponent {
  produtos: ProdutoDetalhesDTO[] = [];
  servicos: ServicoDetalhesDTO[] = [];

  constructor(
    private produtoService: ProdutoService,
    private servicoService: ServicoService
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
    this.carregarServicos();
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
}
