import { Component } from '@angular/core';
import { FaturaDetalhesDTO, FaturaService } from 'src/app/service/fatura.service';

@Component({
  selector: 'app-faturamento',
  standalone: false,
  templateUrl: './faturamento.component.html',
  styleUrls: ['./faturamento.component.scss']
})
export class FaturamentoComponent {

  faturas: FaturaDetalhesDTO[] = [];
  mostrardialogo: boolean = false;

  constructor(private faturaService: FaturaService) {}

  ngOnInit(): void {
    this.carregarFaturas();
  }

  carregarFaturas(): void {
    this.faturaService.listarFaturas().subscribe(data => {
      this.faturas = data || [];
      console.log(data);
    });
  }
}