import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FaturaService, FaturaValorTotalDTO } from 'src/app/service/fatura.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  valorTotalMes: FaturaValorTotalDTO | null = null;

  produtoTotalMes: FaturaValorTotalDTO | null = null;
  servicoTotalMes: FaturaValorTotalDTO | null = null;

  constructor(
    private faturaService: FaturaService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.obterValorTotalFaturasMesAtual();
    this.totalProdutosMes();
    this.totalServicoMes();
  }

  obterValorTotalFaturasMesAtual(): void {
    this.faturaService.obterValorTotalFaturasMesAtual().subscribe({
      next: (data) => {
        this.valorTotalMes = data;
      },
      error: (err) => {
        console.error('Erro ao obter valor total das faturas do mês', err);
      }
    });
  }

  totalProdutosMes(): void {
    this.faturaService.obterValorTotalFaturasProdutoMesAtual().subscribe({
      next: (data) => {
        this.produtoTotalMes = data;
      },
      error: (err) => {
        console.error('Erro ao obter valor total das faturas do mês', err);
      }
    });
  }

  totalServicoMes(): void {
    this.faturaService.obterValorTotalFaturasServicoMesAtual().subscribe({
      next: (data) => {
        this.servicoTotalMes = data;
      },
      error: (err) => {
        console.error('Erro ao obter valor total das faturas do mês', err);
      }
    });
  }

  navegarParaNovaVenda(){
    this.router.navigate(['nova-venda'])
  }

}
