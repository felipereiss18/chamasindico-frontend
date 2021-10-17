import {Perfil} from "./perfil";

export interface User {
  id: number;
  usuario: string;
  nome: string
  perfil: Perfil | null;
  condominio: number;
}
