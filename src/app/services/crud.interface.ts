import {Observable} from "rxjs";
import {ResponseDto} from "../interfaces/response-dto.interface";

export interface ICrudService<T, ID> {
  save(t: T): Observable<ResponseDto<T>>;
  update(id: ID, t: T): Observable<ResponseDto<T>>;
  findOne(id: ID): Observable<ResponseDto<T>>;
  findAll(): Observable<ResponseDto<T[]>>;
  delete(id: ID): Observable<any>;
}
