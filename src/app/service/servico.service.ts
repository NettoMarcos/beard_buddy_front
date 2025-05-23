import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface para as DTOs (pode ser movida para arquivos separados se necessário)
export interface ServicoDetalhesDTO {
  id: number;
  nome: string;
  preco: number;
  valorEmPontos: number;
}

export interface ServicoCadastroDTO {
  nome: string;
  preco: number;
  valorEmPontos?: number;
}

export interface ServicoAtualizarDTO {
  id: number;
  nome?: string;
  preco?: number;
  valorEmPontos?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  private apiUrl = 'http://localhost:8080/servico';

  constructor(private http: HttpClient) {}

  // Cadastrar Serviço
  cadastrarServico(dto: ServicoCadastroDTO): Observable<ServicoDetalhesDTO> {
    return this.http.post<ServicoDetalhesDTO>(`${this.apiUrl}/cadastrar`, dto);
  }

  // Listar Serviços
  listarServicos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listar`);
  }

  // Buscar Serviço por ID
  buscarPorId(id: number): Observable<ServicoDetalhesDTO> {
    return this.http.get<ServicoDetalhesDTO>(`${this.apiUrl}/${id}`);
  }

  // Atualizar Serviço
  atualizarServico(dto: ServicoAtualizarDTO): Observable<ServicoDetalhesDTO> {
    return this.http.put<ServicoDetalhesDTO>(`${this.apiUrl}/atualizar`, dto);
  }

  // Excluir Serviço
  excluirServico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar/${id}`);
  }
}
