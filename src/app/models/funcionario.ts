import {Usuario} from "./usuario";
import {Condominio} from "./condominio";

export class Funcionario {

  usuario: Usuario;
  condominio: Condominio | undefined;
  nome: string;
  cpf: string;
  nascimento: string;
  email: string;
  telefone: string;


  constructor(
    usuario: Usuario,
    nome: string,
    cpf: string,
    nascimento: string,
    email: string,
    telefone: string,
    condominio?: Condominio,
  ) {
    this.usuario = usuario;
    this.condominio = condominio;
    this.nome = nome;
    this.cpf = cpf;
    this.nascimento = nascimento;
    this.email = email;
    this.telefone = telefone;
  }
}
