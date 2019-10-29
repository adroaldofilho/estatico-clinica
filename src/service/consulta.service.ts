import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Consulta } from 'src/model/consulta';



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
export class ConsultaService {

  constructor(private http: HttpClient) { }

  addConsulta(consulta): Observable<Consulta> {
    console.log('addConsulta', consulta);
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.post<Consulta>(`${apiUrl}/consulta/create`, consulta, { headers }).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((consulta: Consulta) => console.log(`adicionou o Plano com w/ id=${consulta.idConsulta}`)),
      catchError(this.handleError<Consulta>('addConsulta'))
    );
  }
  
  getConsulta(idConsulta: number){
    console.log('idConsulta', idConsulta);
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<Consulta>(`${apiUrl}/consulta/${idConsulta}`, { headers }).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((consulta: Consulta) => console.log(`adicionou o Plano com w/ id=${consulta.idConsulta}`)),
      catchError(this.handleError<Consulta>('addConsulta'))
    );
  }

  getConsultas(idProfissionalClinica: number){
    console.log('idProfissionalClinica', idProfissionalClinica);
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<Consulta>(`${apiUrl}/consulta/profissional/${idProfissionalClinica}`, { headers }).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((consulta: Consulta) => console.log(`adicionou o Plano com w/ id=${consulta.idConsulta}`)),
      catchError(this.handleError<Consulta>('addConsulta'))
    );
  }

  getConsultaByUsuario(idUsuario: number){
    console.log('idUsuario', idUsuario);
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<Consulta>(`${apiUrl}/consulta/usuario/${idUsuario}`, { headers }).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((consulta: Consulta) => console.log(`adicionou o Plano com w/ id=${consulta.idConsulta}`)),
      catchError(this.handleError<Consulta>('addConsulta'))
    );
  }

  update(id, consulta): Observable<any> {
    const url = `${apiUrl}/consulta/${id}/update`;
    return this.http.put(url, consulta, { headers }).pipe(
      tap(_ => console.log(`atualiza a Consulta com id=${id}`)),
      catchError(this.handleError<any>('updateClinica'))
    );
  }

  deleteConsulta(id): Observable<Consulta> {
    const url = `${apiUrl}/consulta/${id}/destroy`;

    return this.http.delete<Consulta>(url, { headers }).pipe(
      tap(_ => console.log(`remove o Consulta com id=${id}`)),
      catchError(this.handleError<Consulta>('deleteConsulta'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
