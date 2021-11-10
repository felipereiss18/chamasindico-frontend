import {Usuario} from "./usuario";

export class Inquilino {

  nome: string;
  cpf: string;
  nascimento: string;
  email: string;
  telefone: string;
  usuario: Usuario;


  constructor(nome: string, cpf: string, nascimento: string, email: string, telefone: string, usuario: Usuario) {
    this.nome = nome;
    this.cpf = cpf;
    this.nascimento = nascimento;
    this.email = email;
    this.telefone = telefone;
    this.usuario = usuario;
  }
}
