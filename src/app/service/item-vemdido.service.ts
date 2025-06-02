import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface itemVendidoCadastroDTO {
  itemId: number;
  quantidade: number;
}

export interface itemVendidoDetalhesDTO {
  id: number;
  item: {
    id: number;
    nome: string;
    preco: number;
    valorEmPontos: number;
  };
  quantidade: number;
  valorTotal: number;
  lucroTotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class ItemVemdidoService {

  private baseUrl: string = `${environment.apiUrl}/item_vendido`;

  constructor(private http: HttpClient) { }

  cadastrarItensVendido(itensVendidos: itemVendidoCadastroDTO[]): Observable<itemVendidoDetalhesDTO[]> {
    return this.http.post<itemVendidoDetalhesDTO[]>(`${this.baseUrl}/cadastrar`, itensVendidos);
  }

  cadastrarItensVendidoComCpf(itensVendidos: itemVendidoCadastroDTO[], cpf: String): Observable<itemVendidoDetalhesDTO[]> {
    return this.http.post<itemVendidoDetalhesDTO[]>(`${this.baseUrl}/cadastrar/${cpf}`, itensVendidos);
  }

  deletarItemVendido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletar/${id}`);
  }

}
