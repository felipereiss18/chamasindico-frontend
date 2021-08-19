import {Injectable} from "@angular/core";

const KEY = 'authToken';

@Injectable({providedIn: 'root'})
export class TokenService {

  hasToken(): boolean{
    return !!this.getToken()
  }

  getToken(): string {
    return <string>window.sessionStorage.getItem(KEY);
  }

  setToken(token: string | null){
    if (token) {
      window.sessionStorage.setItem(KEY, token)
    }
  }

  removeToken(){
    window.sessionStorage.removeItem(KEY)
  }

}
