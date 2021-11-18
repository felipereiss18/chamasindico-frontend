import {Funcionario} from "./funcionario";
import {Condominio} from "./condominio";
import {Unidade} from "./unidade";

export class Correspondencia {

  id: number | undefined;
  unidade: Unidade;
  bloco: string;
  condominio: Condominio;
  remetente: string;
  data: string;
  genero: string;
  funcionarioCriacao: Funcionario | undefined;
  funcionarioEntrega: Funcionario | undefined;
  entrega: string | undefined;


  constructor(unidade: Unidade,
              bloco: string,
              condominio: Condominio,
              remetente: string, data: string,
              genero: string,
              funcionarioCriacao?: Funcionario,
              id?: number,
              funcionarioEntrega?: Funcionario,
              entrega?: string) {
    this.id = id;
    this.unidade = unidade;
    this.bloco = bloco;
    this.condominio = condominio;
    this.remetente = remetente;
    this.data = data;
    this.genero = genero;
    this.funcionarioCriacao = funcionarioCriacao;
    this.funcionarioEntrega = funcionarioEntrega;
    this.entrega = entrega;
  }
}
