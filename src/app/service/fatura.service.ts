import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface FaturaDetalhesDTO {
  id: number;
  dataGeracao: Date;
  valorTotal: number;
  lucroTotal: number;
  cliente: {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    dataNascimento: Date;
    pontos: number;
  };
  itensVendidos: Array<{
    id: number;
    Item: {
      id: number;
      nome: string;
      preco: number;
      valorEmPontos: number;
      estoque: number;
      valorComprado: number;
    };
    quantidade: number;
    valorTotal: number;
    lucroTotal: number;
  }>
}

export interface FaturaValorTotalDTO {
  somaTotal: number;
}


@Injectable({
  providedIn: 'root'
})
export class FaturaService {
  private baseUrl: string = 'https://beardbuddy.onrender.com/fatura';  // Defina a URL base para o seu back-end

  constructor(private http: HttpClient) {}


  // Método para listar as faturas
  listarFaturas(): Observable<FaturaDetalhesDTO[]> {
    return this.http.get<FaturaDetalhesDTO[]>(`${this.baseUrl}/listar`);
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
  obterLucroLiquidoMes(): Observable<number> {
    const url = `${this.baseUrl}/lucro_liquido_mes`;
    return this.http.get<number>(url);
  }

  // Método para obter o valor total das faturas de produto do mês atual
  obterLucroBrutoMes(): Observable<number> {
    const url = `${this.baseUrl}/lucro_bruto_mes`;
    return this.http.get<number>(url);
  }
}