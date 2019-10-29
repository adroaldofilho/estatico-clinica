import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Usuario } from 'src/model/usuario';


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
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    console.log('ApiService: PASSEI AQUI');
    // console.log(headers);
    // console.log(apiUrl);
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario[]>(`${apiUrl}/usuario/all`, { headers })
      .pipe(
        tap(Usuarios => console.log('leu os Usuarios')),
        catchError(this.handleError('getUsuarios', []))
      );
  }
  
  getPacientes(): Observable<Usuario[]> {
    console.log('ApiService: PASSEI AQUI');
    // console.log(headers);
    // console.log(apiUrl);
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario[]>(`${apiUrl}/usuario/tipousuario/Paciente`, { headers })
      .pipe(
        tap(Usuarios => console.log('leu os Usuarios')),
        catchError(this.handleError('getUsuarios', []))
      );
  }

  getUsuario(id: number): Observable<Usuario> {
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);
    const url = `${apiUrl}/usuario/${id}`;
    return this.http.get<Usuario>(url, { headers }).pipe(
      tap(_ => console.log(`leu o Usuario id=${id}`)),
      catchError(this.handleError<Usuario>(`getUsuario id=${id}`))
    );
  }

  addUsuario(usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${apiUrl}/usuario/create`, usuario, { headers }).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((usuario: Usuario) => console.log(`adicionou o Usuario com w/ id=${usuario.idUsuario}`)),
      catchError(this.handleError<Usuario>('addUsuario'))
    );
  }

  updateUsuario(id, usuario): Observable<any> {
    const url = `${apiUrl}/usuario/${id}/update`;
    return this.http.put(url, usuario, { headers }).pipe(
      tap(_ => console.log(`atualiza o usuario com id=${id}`)),
      catchError(this.handleError<any>('updateUsuario'))
    );
  }

  deleteUsuario(id): Observable<Usuario> {
    const url = `${apiUrl}/usuario/${id}/destroy`;

    return this.http.delete<Usuario>(url, { headers }).pipe(
      tap(_ => console.log(`remove o Usuario com id=${id}`)),
      catchError(this.handleError<Usuario>('deleteUsuario'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
