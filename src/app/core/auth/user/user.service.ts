import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {User} from "./user";
import {TokenService} from "../token/token.service";
import jwt_decode from 'jwt-decode';
import {UserToken} from "./user-token";
import {Perfil} from "./perfil";

@Injectable({providedIn: "root"})
export class UserService {

  // @ts-ignore
  private userSubject = new BehaviorSubject<User>(null)
  private userName: string | undefined;

  constructor(private tokenService: TokenService) {
    this.tokenService.hasToken() && this.decodeAndNotify()
  }

  setToken(token: string | null) {
    this.tokenService.setToken(token)
    this.decodeAndNotify();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  private decodeAndNotify(){
    const token = this.tokenService.getToken();
    const userToken = jwt_decode(token) as UserToken;
    this.userName = userToken.username;

    let user = {} as User;
    user.id = Number(userToken.sub);
    user.nome = userToken.nome;
    user.usuario = userToken.username;
    user.perfil = this.verificarPerfil(userToken.role)

    this.userSubject.next(user);
  }

  logout(){
    this.tokenService.removeToken();
    // @ts-ignore
    this.userSubject.next(null);
  }

  isLogged(){
    return this.tokenService.hasToken();
  }

  getUserName(){
    return this.userName;
  }

  private verificarPerfil(role: string): Perfil | null {
    switch (role.toUpperCase()){
      case 'ADMIN':
        return {role: role, descricao: 'Administrador'};
      case 'SINDICO':
        return {role: role, descricao: 'Síndico'};
      case 'PROPRIE':
        return {role: role, descricao: 'Proprietário'}
      case 'INQUILINO':
        return {role: role, descricao: 'Inquilino'}
      case 'PORTEIRO':
        return {role: role, descricao: 'PORTEIRO'}
      case 'ZELADOR':
        return {role: role, descricao: 'Zelador'}
    }

    return null;
  }
}
