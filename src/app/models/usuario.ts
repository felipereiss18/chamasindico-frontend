import {Perfil} from "../core/auth/user/perfil";

export class Usuario {
  id: number | undefined;
  nome: string;
  perfil: Perfil;
  situacao: boolean;
  senha: string | undefined

  constructor(nome: string, perfil: Perfil, situacao: boolean, id?: number, senha?: string) {
    this.id = id;
    this.nome = nome;
    this.perfil = perfil;
    this.situacao = situacao;
    this.senha = senha;
  }
}
