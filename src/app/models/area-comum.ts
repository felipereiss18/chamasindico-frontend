import {Bloco} from "./bloco";
import {Time} from "@angular/common";

export class AreaComum {

  condominio: {id: number} | undefined;
  bloco: {id: number} | undefined;
  nome: string | undefined;
  locacao: boolean | undefined;
  inicial: Time | undefined;
  fim: Time | undefined;
  tipoReserva: number | undefined;
  tipoConfirmacao: number | undefined;
  limpeza: string | undefined;
  anotacao: string | undefined;
  situacao: boolean | undefined;
  diasFuncionamento: number[] | undefined;



  constructor(condominio?: { id: number },
              bloco?: { id: number },
              nome?: string,
              locacao?: boolean,
              tipoReserva?: number,
              tipoConfirmacao?: number,
              situacao?: boolean,
              inicial?: Time,
              fim?: Time,
              limpeza?: string,
              anotacao?: string,
              diasFuncionamento?: number[]) {

    this.condominio = condominio;
    this.bloco = bloco;
    this.nome = nome;
    this.locacao = locacao;
    this.inicial = inicial;
    this.fim = fim;
    this.tipoReserva = tipoReserva;
    this.tipoConfirmacao = tipoConfirmacao;
    this.limpeza = limpeza;
    this.anotacao = anotacao;
    this.situacao = situacao;
    this.diasFuncionamento = diasFuncionamento;
  }
}
