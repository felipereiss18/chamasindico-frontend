import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {User} from "./user";
import {TokenService} from "../token/token.service";
import jwt_decode from 'jwt-decode';
import {UserToken} from "./user-token";
import {Perfil} from "./perfil";
import {PerfilService} from "../../../services/perfil/perfil.service";

@Injectable({providedIn: "root"})
export class UserService {

  // @ts-ignore
  private userSubject = new BehaviorSubject<User>(null)
  private userName: string | undefined;

  constructor(private tokenService: TokenService, private perfilService: PerfilService) {
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
    user.perfil = userToken.perfil;

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
}
