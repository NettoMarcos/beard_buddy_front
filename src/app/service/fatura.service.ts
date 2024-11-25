import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface FaturaCadastroDTO {
  cpfCliente: string;
  id_venda: number;
  qtd_venda: number;
  tipo: string;
  pagoEmPontos: boolean;
}

export interface FaturaDetalhesDTO {
  id: number;
  cpfCliente: string;
  id_venda: number;
  qtd_venda: number
  tipo: string;
  dataPagamento: Date;
  valorFatura: number;

}

export interface FaturaValorTotalDTO {
  somaTotal: number;
}


@Injectable({
  providedIn: 'root'
})
export class FaturaService {
  private baseUrl: string = `${environment.apiUrl}/fatura`;  // Defina a URL base para o seu back-end

  constructor(private http: HttpClient) {}

  // Método para cadastrar faturas
  cadastrarFatura(faturas: FaturaCadastroDTO): Observable<FaturaCadastroDTO> {
    const url = `${this.baseUrl}/cadastrar`;
    return this.http.post<FaturaCadastroDTO>(url, faturas);
  }

  // Método para listar as faturas
  listarFaturas(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/listar`);
  }

  // Método para buscar fatura por ID
  buscarFaturaPorId(id: number): Observable<FaturaDetalhesDTO> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<FaturaDetalhesDTO>(url);
  }

  // Método para excluir fatura
  excluirFatura(id: number): Observable<void> {
    const url = `${this.baseUrl}/deletar/${id}`;
    return this.http.delete<void>(url);
  }

  // Método para obter o valor total das faturas do mês atual
  obterValorTotalFaturasMesAtual(): Observable<FaturaValorTotalDTO> {
    const url = `${this.baseUrl}/total-mes`;
    return this.http.get<FaturaValorTotalDTO>(url);
  }

  // Método para obter o valor total das faturas de produto do mês atual
  obterValorTotalFaturasProdutoMesAtual(): Observable<FaturaValorTotalDTO> {
    const url = `${this.baseUrl}/total-mes/produto`;
    return this.http.get<FaturaValorTotalDTO>(url);
  }

  // Método para obter o valor total das faturas de serviço do mês atual
  obterValorTotalFaturasServicoMesAtual(): Observable<FaturaValorTotalDTO> {
    const url = `${this.baseUrl}/total-mes/servico`;
    return this.http.get<FaturaValorTotalDTO>(url);
  }
}