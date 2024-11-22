import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ClienteDetalhesDTO {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  dataNascimento: Date;
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
}

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private baseUrl = 'http://localhost:8080/cliente'; // Substitua pelo URL do seu backend

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
}