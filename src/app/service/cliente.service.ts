import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ClienteDetalhesDTO {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  dataNascimento: Date;
  pontos: number;
}

export interface ClienteCadastroDTO {
  nome: string;
  cpf: string;
  telefone?: string;
  dataNascimento?: Date;
}

export interface ClienteAtualizarDTO {
  id: number;
  nome?: string;
  cpf?: string;
  telefone?: string;
  dataNascimento?: Date;
  pontos?: number
}

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private baseUrl: string = `${environment.apiUrl}/cliente`;// Substitua pelo URL do seu backend

  constructor(private http: HttpClient) {}

  cadastrarCliente(cliente: ClienteCadastroDTO): Observable<ClienteDetalhesDTO> {
    return this.http.post<ClienteDetalhesDTO>(`${this.baseUrl}/cadastrar`, cliente);
  }

  listarClientes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/listar`);
  }

  buscarPorId(id: number): Observable<ClienteDetalhesDTO> {
    return this.http.get<ClienteDetalhesDTO>(`${this.baseUrl}/${id}`);
  }

  atualizarCliente(cliente: ClienteAtualizarDTO): Observable<ClienteDetalhesDTO> {
    return this.http.put<ClienteDetalhesDTO>(`${this.baseUrl}/atualizar`, cliente);
  }

  excluirCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletar/${id}`);
  }
  
  buscarPontos(cpf: string): Observable<{ pontos: number }> {
    return this.http.get<{ pontos: number }>(`${this.baseUrl}/buscar-pontos/${cpf}`);
  }
}