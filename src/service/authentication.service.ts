import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = `${environment.dbUrl}/auth/token`;
let headers = new HttpHeaders();
// headers = headers.set('Authorization', `Bearer ${token}`);
headers = headers.append('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }
  public get loggedIn(): boolean {
    return (localStorage.getItem('currentUser') !== null);
  }

  getToken(credentials: any): Observable<any> {
    return this.http.post<string>(apiUrl, credentials, {headers}).pipe(
      tap(_ => console.log(`Gerou o token do usuario ${credentials.email}`)),
      catchError(this.handleError<string>('getToken'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
