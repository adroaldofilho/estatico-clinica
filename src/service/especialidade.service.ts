import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Especialidade } from 'src/model/Especialidade';


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
export class EspecialidadeService {

  constructor(private http: HttpClient) { }

  getEspecialidades(): Observable<Especialidade[]> {
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<Especialidade[]>(`${apiUrl}/especialidade/all`, { headers })
      .pipe(
        tap(Especialidades => console.log('leu as Especialidades')),
        catchError(this.handleError('getEspecialidades', []))
      );
  }

  getEspecialidade(id: number): Observable<Especialidade> {
    const url = `${apiUrl}/especialidade/${id}`;
    return this.http.get<Especialidade>(url, { headers }).pipe(
      tap(_ => console.log(`leu o Especialidade id=${id}`)),
      catchError(this.handleError<Especialidade>(`getEspecialidade id=${id}`))
    );
  }

  addEspecialidade(especialidade): Observable<Especialidade> {
    return this.http.post<Especialidade>(`${apiUrl}/especialidade/create`, especialidade, { headers }).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((especialidade: Especialidade) => console.log(`adicionou o Especialidade com w/ id=${especialidade.idEspecialidade}`)),
      catchError(this.handleError<Especialidade>('addEspecialidade'))
    );
  }

  updateEspecialidade(id, especialidade): Observable<any> {
    const url = `${apiUrl}/especialidade/${id}/update`;
    return this.http.put(url, especialidade, { headers }).pipe(
      tap(_ => console.log(`atualiza o Especialidade com id=${id}`)),
      catchError(this.handleError<any>('updateEspecialidade'))
    );
  }

  deleteEspecialidade(id): Observable<Especialidade> {
    const url = `${apiUrl}/especialidade/${id}/destroy`;

    return this.http.delete<Especialidade>(url, { headers }).pipe(
      tap(_ => console.log(`remove o Especialidade com id=${id}`)),
      catchError(this.handleError<Especialidade>('deleteEspecialidade'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
