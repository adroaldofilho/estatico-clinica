import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Clinica } from 'src/model/clinica';
import { ProfissionalClinica } from 'src/model/profissionalclinica';
import { environment } from 'src/environments/environment';

const apiUrl = environment.dbUrl;

let headers = new HttpHeaders();

headers = headers.set('Content-Type', 'application/json');
@Injectable({
  providedIn: 'root'
})
export class ClinicaService {

  constructor(private http: HttpClient) { }

  getClinicas(): Observable<Clinica[]> {
    console.log('ApiService: PASSEI AQUI');
    // console.log(headers);
    // console.log(apiUrl);
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<Clinica[]>(`${apiUrl}/clinica/all`, { headers })
      .pipe(
        tap(Clinicas => console.log('leu os Clinicas')),
        catchError(this.handleError('getClinicas', []))
      );
  }
  
  getClinica(id: number): Observable<Clinica> {
    const url = `${apiUrl}/clinica/${id}`;
    return this.http.get<Clinica>(url, { headers }).pipe(
      tap(_ => console.log(`leu o Clinica id=${id}`)),
      catchError(this.handleError<Clinica>(`getClinica id=${id}`))
    );
  }

  addClinica(clinica): Observable<Clinica> {
    return this.http.post<Clinica>(`${apiUrl}/clinica/create`, clinica, { headers }).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((clinica: Clinica) => console.log(`adicionou o Clinica com w/ id=${clinica.idClinica}`)),
      catchError(this.handleError<Clinica>('addClinica'))
    );
  }

  updateClinica(id, clinica): Observable<any> {
    const url = `${apiUrl}/clinica/${id}/update`;
    return this.http.put(url, clinica, { headers }).pipe(
      tap(_ => console.log(`atualiza o Clinica com id=${id}`)),
      catchError(this.handleError<any>('updateClinica'))
    );
  }

  deleteClinica(id): Observable<Clinica> {
    const url = `${apiUrl}/clinica/${id}/destroy`;

    return this.http.delete<Clinica>(url, { headers }).pipe(
      tap(_ => console.log(`remove o Clinica com id=${id}`)),
      catchError(this.handleError<Clinica>('deleteClinica'))
    );
  }

  addProfissionalClinica(profissionalClinica): Observable<ProfissionalClinica>{
    return this.http.post<ProfissionalClinica>(`${apiUrl}/profissionalclinica/create`, profissionalClinica, { headers })
    .pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((profissionalClinica: ProfissionalClinica) => 
        console.log(`adicionou o ProfissionalClinica com w/ id=${profissionalClinica.idProfissionalClinica}`)),
      catchError(this.handleError<ProfissionalClinica>('addProfissionalClinica'))
    );
  }

  removeProfissionalClinica(profissionalClinica): Observable<ProfissionalClinica>{
    const url = `${apiUrl}/profissionalclinica/destroybyprofissionalclinica`;

    return this.http.post<ProfissionalClinica>(url, profissionalClinica, { headers }).pipe(
      tap(_ => console.log(`remove o ProfissionalClinica com id=${profissionalClinica}`)),
      catchError(this.handleError<ProfissionalClinica>('deleteProfissionalClinica'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
