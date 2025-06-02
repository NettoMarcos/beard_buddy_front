import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Interfaces para as DTOs
export interface ProdutoDetalhesDTO {
  id: number;
  nome: string;
  preco: number;
  valorEmPontos: number;
  estoque: number;
  valorComprado: number;
}

export interface ProdutoCadastroDTO {
  nome: string;
  preco: number;
  valorEmPontos?: number;
  estoque: number;
  valorComprado: number;
}

export interface ProdutoAtualizarDTO {
  id: number;
  nome?: string;
  preco?: number;
  valorEmPontos?: number;
  estoque?: number;
  valorComprado?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

 private baseUrl: string = 'https://beardbuddy.onrender.com/produto';

  constructor(private http: HttpClient) {}

  // Cadastrar Produto
  cadastrarProduto(dto: ProdutoCadastroDTO): Observable<ProdutoDetalhesDTO> {
    return this.http.post<ProdutoDetalhesDTO>(`${this.baseUrl}/cadastrar`, dto);
  }

  // Listar Produtos
  listarProdutos(): Observable<any> {
    
    return this.http.get<any>(`${this.baseUrl}/listar`);
  }

  // Buscar Produto por ID
  buscarPorId(id: number): Observable<ProdutoDetalhesDTO> {
    return this.http.get<ProdutoDetalhesDTO>(`${this.baseUrl}/${id}`);
  }

  // Atualizar Produto
  atualizarProduto(dto: ProdutoAtualizarDTO): Observable<ProdutoDetalhesDTO> {
    return this.http.put<ProdutoDetalhesDTO>(`${this.baseUrl}/atualizar`, dto);
  }

  // Excluir Produto
  excluirProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/atualizar/${id}`);
  }
}
