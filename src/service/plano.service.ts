import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Plano } from 'src/model/plano';


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
export class PlanoService {

  constructor(private http: HttpClient) { }

  getPlanos(): Observable<Plano[]> {
    console.log('ApiService: PASSEI AQUI');
    // console.log(headers);
    // console.log(apiUrl);
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<Plano[]>(`${apiUrl}/plano/all`, { headers })
      .pipe(
        tap(Planos => console.log('leu os Planos')),
        catchError(this.handleError('getPlanos', []))
      );
  }

  getPlano(id: number): Observable<Plano> {
    const url = `${apiUrl}/plano/${id}`;
    return this.http.get<Plano>(url, { headers }).pipe(
      tap(_ => console.log(`leu o Plano id=${id}`)),
      catchError(this.handleError<Plano>(`getPlano id=${id}`))
    );
  }

  addPlano(plano): Observable<Plano> {
    return this.http.post<Plano>(`${apiUrl}/Plano/create`, plano, { headers }).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((plano: Plano) => console.log(`adicionou o Plano com w/ id=${plano.idPlano}`)),
      catchError(this.handleError<Plano>('addPlano'))
    );
  }

  updatePlano(id, plano): Observable<any> {
    const url = `${apiUrl}/plano/${id}/update`;
    return this.http.put(url, plano, { headers }).pipe(
      tap(_ => console.log(`atualiza o Plano com id=${id}`)),
      catchError(this.handleError<any>('updatePlano'))
    );
  }

  deletePlano(id): Observable<Plano> {
    const url = `${apiUrl}/plano/${id}/destroy`;

    return this.http.delete<Plano>(url, { headers }).pipe(
      tap(_ => console.log(`remove o Plano com id=${id}`)),
      catchError(this.handleError<Plano>('deletePlano'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
