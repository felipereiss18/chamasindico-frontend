import {Condominio} from "./condominio";
import {Estado} from "./estado";
import {Unidade} from "./unidade";
import {Usuario} from "./usuario";

export class Proprietario {

  bairro: string | undefined;
  bloco: string | undefined;
  cep: number | undefined;
  cidade: string | undefined;
  complemento: string | undefined;
  condominio: Condominio | undefined;
  cpf: string | undefined;
  email: string | undefined;
  endereco: string | undefined;
  estado: Estado | undefined;
  morador: boolean | undefined;
  nascimento: string | undefined;
  nome: string | undefined;
  numero: number | undefined;
  sindico: boolean | undefined;
  telefone: string | undefined;
  unidade: Unidade | undefined;
  usuario: Usuario | undefined;


  constructor(id?: number, bairro?: string, bloco?: string, cep?: number, cidade?: string, complemento?: string,
              condominio?: Condominio, cpf?: string, email?: string, endereco?: string, estado?: Estado,
              morador?: boolean, nascimento?: string, nome?: string, numero?: number, sindico?: boolean,
              telefone?: string, unidade?: Unidade, usuario?: Usuario) {
    this.bairro = bairro;
    this.bloco = bloco;
    this.cep = cep;
    this.cidade = cidade;
    this.complemento = complemento;
    this.condominio = condominio;
    this.cpf = cpf;
    this.email = email;
    this.endereco = endereco;
    this.estado = estado;
    this.morador = morador;
    this.nascimento = nascimento;
    this.nome = nome;
    this.numero = numero;
    this.sindico = sindico;
    this.telefone = telefone;
    this.unidade = unidade;
    this.usuario = usuario;
  }
}
