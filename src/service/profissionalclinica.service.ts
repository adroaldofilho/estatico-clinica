import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { ProfissionalClinica } from 'src/model/profissionalclinica';



// const httpOptions = {
//   headers: new HttpHeaders({'Content-Type': 'application/json'})
// };

let headers = new HttpHeaders();

headers = headers.set('Content-Type', 'application/json');
// headers = headers.append('Access-Control-Allow-Origin', '*');
const apiUrl = 'http://192.168.15.133:5000/api-clinica/v1';

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
