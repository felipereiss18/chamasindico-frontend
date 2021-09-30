import {Perfil} from "./perfil";

export interface UserToken {
  sub: string;
  username: string;
  role: string;
  nome: string;
  perfil: Perfil
}
