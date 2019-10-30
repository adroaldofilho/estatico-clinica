import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { ProfissionalClinica } from 'src/model/profissionalclinica';
import { environment } from 'src/environments/environment';

const apiUrl = environment.dbUrl;

let headers = new HttpHeaders();

headers = headers.set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class ProfissionalClinicaService {

  constructor(private http: HttpClient) { }

  addProfissionalClinica(profissionalClinica): Observable<ProfissionalClinica>{
    return this.http.post<ProfissionalClinica>(`${apiUrl}/profissionalclinica/create`, profissionalClinica, { headers })
    .pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((profissionalClinica: ProfissionalClinica) => 
        console.log(`adicionou o ProfissionalClinica com w/ id=${profissionalClinica.idProfissionalClinica}`)),
      catchError(this.handleError<ProfissionalClinica>('addProfissionalClinica'))
    );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
