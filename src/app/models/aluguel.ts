import {Inquilino} from "./inquilino";

export class Aluguel {

  id: number | undefined;
  dataInicio: string;
  dataFim: string;
  inquilino: Inquilino;


  constructor(dataInicio: string, dataFim: string, inquilino: Inquilino, id?: number) {
    this.id = id;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.inquilino = inquilino;
  }
}
