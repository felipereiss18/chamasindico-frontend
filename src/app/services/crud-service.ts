import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {ICrudService} from "./crud.interface";

export abstract class CrudService<T, ID> implements ICrudService<T, ID> {
  public base: string;
  protected http: HttpClient;
  protected options: { headers: HttpHeaders } | undefined;

  protected constructor(base: string, http: HttpClient, options?: { headers: HttpHeaders }) {

    this.base = base;
    this.http = http;
    if (options === null) {
      this.options = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
    } else {
      this.options = options;
    }
  }

  save(t: T) {

    return this.http.post<T>( this.base, t, this.options )
      .pipe(
        catchError( this.handleError )
      );
  }

  update(id: ID, t: T) {
    return this.http.put<T>( this.base + '/' + id, t, this.options )
      .pipe(
        catchError( this.handleError )
      );
  }

  findOne(id: ID) {
    return this.http.get<T>(this.base + '/' + id, this.options).pipe(
      catchError( this.handleError ) );
  }

  findAll() {
    return this.http.get<T[]>( this.base, this.options ).pipe(
      catchError( this.handleError )
    );
  }

  delete( id: ID ) {
    return this.http.delete( this.base + '/' + id, this.options )
      .pipe(
        catchError( this.handleError )
      );
  }

  protected handleError( error: HttpErrorResponse ) {
    let msg: string;

    if ( error.error instanceof ErrorEvent ) {
      msg = error.error.message;
    } else {
      msg = error.error;
    }

    return throwError( msg );
  }
}
