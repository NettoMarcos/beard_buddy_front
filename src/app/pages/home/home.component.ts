import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { filter } from 'rxjs';
import { FaturaService, FaturaValorTotalDTO } from 'src/app/service/fatura.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lucroLiquidoMes: number | null = null;
  lucroBrutoMes: number | null = null;


  constructor(
    private faturaService: FaturaService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.carregarDados();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.carregarDados();
    });
  }

  carregarDados(): void {
    this.obterLucroLiquidoMes();
    this.obterLucroBrutoMes();
  }

  obterLucroLiquidoMes(): void {
    this.faturaService.obterLucroLiquidoMes().subscribe({
      next: (data) => {
        this.lucroLiquidoMes = data;
      },
      error: (err) => {
        console.error('Erro ao obter lucro liquido do mês', err);
      }
    });
  }

  obterLucroBrutoMes(): void {
    this.faturaService.obterLucroBrutoMes().subscribe({
      next: (data) => {
        this.lucroBrutoMes = data;
      },
      error: (err) => {
        console.error('Erro ao obter lucro bruto do mês', err);
      }
    });
  }

  navegarParaNovaVenda(){
    this.router.navigate(['nova-venda'])
  }

}
