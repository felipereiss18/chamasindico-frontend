import { Injectable } from '@angular/core';
import {BaseService} from "../base-service";
import {Estado} from "../../models/estado";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EstadoService extends BaseService<Estado, string>{

  constructor(
    http: HttpClient
  ) {
    super(environment.api, http)
  }
}
