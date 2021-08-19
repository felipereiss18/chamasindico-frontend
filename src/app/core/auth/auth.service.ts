import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {UserService} from "./user/user.service";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpCliente: HttpClient,
    private userService: UserService
  ) { }

  authenticate(login: string, senha: string){
    const body = {login: login, senha: senha}
    return this.httpCliente.post(environment.api + 'auth', body, {observe: 'response', responseType: 'text'})
      .pipe(tap((res) => {
        const authToken = res.headers.get("Authorization");
        this.userService.setToken(authToken);
        console.log(authToken)
      }));
  }
}
