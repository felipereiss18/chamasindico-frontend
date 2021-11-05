import { Injectable } from '@angular/core';
import {BaseService} from "../base-service";
import {Proprietario} from "../../models/proprietario";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProprietarioService extends BaseService<Proprietario, number>{

  constructor(http: HttpClient) {
    super(environment.api+'proprietario', http)
  }


}
