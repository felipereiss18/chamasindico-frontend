import {AreaComum} from "./area-comum";
import {Time} from "@angular/common";

export class Agenda {
  data: Date | undefined;
  bloco: string | undefined;
  unidade: number | undefined;
  areaComum: AreaComum | undefined;
  termino: Time | undefined;
  inicio: Time | undefined;
  confirmacao: boolean | undefined;
  observacao: string | undefined;
  dono: boolean | undefined;
}
