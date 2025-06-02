import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  private baseUrl: string = `${environment.apiUrl}/servico`;

  constructor(private http: HttpClient) {}

  // Cadastrar Serviço
  cadastrarServico(dto: ServicoCadastroDTO): Observable<ServicoDetalhesDTO> {
    return this.http.post<ServicoDetalhesDTO>(`${this.baseUrl}/cadastrar`, dto);
  }

  // Listar Serviços
  listarServicos(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/listar`);
  }

  // Buscar Serviço por ID
  buscarPorId(id: number): Observable<ServicoDetalhesDTO> {
    return this.http.get<ServicoDetalhesDTO>(`${this.baseUrl}/${id}`);
  }

  // Atualizar Serviço
  atualizarServico(dto: ServicoAtualizarDTO): Observable<ServicoDetalhesDTO> {
    return this.http.put<ServicoDetalhesDTO>(`${this.baseUrl}/atualizar`, dto);
  }

  // Excluir Serviço
  excluirServico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletar/${id}`);
  }
}
