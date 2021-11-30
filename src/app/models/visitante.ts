import {Condominio} from "./condominio";
import {Visita} from "./visita";

export class Visitante {
  documento: string | undefined;
  nome: string | undefined;
  telefone: string | undefined;
  condominio: Condominio | undefined;
  visitas: Visita[] | undefined;
}
