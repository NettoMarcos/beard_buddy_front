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
  exibirDialogDeletar: boolean = false
  exibirDialogFatura: boolean = false;
  faturaSelecionada!: FaturaDetalhesDTO;

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

  confirmarDelecao(): void {
    if (this.faturaSelecionada) {
      this.faturaService.excluirFatura(this.faturaSelecionada.id).subscribe({
        next: () => {
          this.carregarFaturas();
          this.fecharDialogDeletar();
        },
        error: (err) => {
          console.error('Erro ao excluir cliente:', err);
        },
      });
    }
  }

  abrirDialogDeletar(fatura: FaturaDetalhesDTO): void {
    this.faturaSelecionada = fatura;
    this.exibirDialogDeletar = true;
  }

  fecharDialogDeletar(): void {
    this.faturaSelecionada = null!;
    this.exibirDialogDeletar = false;
  }

  abrirDialogoFatura(fatura: FaturaDetalhesDTO): void {
    this.faturaSelecionada = fatura;
    this.exibirDialogFatura = true;
    console.log(fatura);
  }

  fecharDialogFatura(): void {
    this.faturaSelecionada = null!;
    this.exibirDialogFatura = false;
  }
}
