import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Profissional } from 'src/model/profissional';
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
export class ProfissionalService {

  constructor(private http: HttpClient) { }

  getProfissionais(): Observable<Profissional[]> {
    console.log('ApiService: PASSEI AQUI');
    // console.log(headers);
    // console.log(apiUrl);
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<Profissional[]>(`${apiUrl}/profissional/all`, { headers })
      .pipe(
        tap(profissionais => console.log('leu os Profissionais', profissionais)),
        catchError(this.handleError('getProfissionais', []))
      );
  }
  
  getProfissionaisClinica(idClinica: number): Observable<ProfissionalClinica[]> {
    console.log('ApiService: PASSEI AQUI');
    // console.log(headers);
    // console.log(apiUrl);
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<ProfissionalClinica[]>(`${apiUrl}/profissionalclinica/getbyclinica/${idClinica}`, { headers })
      .pipe(
        tap(profissionaisClinica => console.log('leu os Profissionais da Clinica', profissionaisClinica)),
        catchError(this.handleError('getProfissionaisClinica', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
