import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { DocumentoConsulta } from 'src/model/documentoconsulta';
import { environment } from 'src/environments/environment';

const apiUrl = environment.dbUrl;
let headers = new HttpHeaders();

headers = headers.set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class DocumentoConsultaService {

  constructor(private http: HttpClient) { }

  addDocumentoConsulta(documentoConsulta): Observable<DocumentoConsulta> {
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.post<DocumentoConsulta>(`${apiUrl}/documentoconsulta/create`, documentoConsulta, { headers }).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((documentoConsulta: DocumentoConsulta) => console.log(`adicionou o DocumentoConsulta com w/ id=${documentoConsulta.idDocumentoConsulta}`)),
      catchError(this.handleError<DocumentoConsulta>('addDocumentoConsulta'))
    );
  }

  updateDocumentoConsulta(id, documentoConsulta): Observable<any> {
    console.log('id: ', id);
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);
    const url = `${apiUrl}/documentoconsulta/${id}/update`;
    return this.http.put(url, documentoConsulta, { headers }).pipe(
      tap(_ => console.log(`atualiza o DocumentoConsulta com id=${id}`)),
      catchError(this.handleError<any>('updateDocumentoConsulta'))
    );
  }

  deleteDocumentoConsulta(id): Observable<DocumentoConsulta> {
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);
    const url = `${apiUrl}/documentoconsulta/${id}/destroy`;

    return this.http.delete<DocumentoConsulta>(url, { headers }).pipe(
      tap(_ => console.log(`remove o DocumentoConsulta com id=${id}`)),
      catchError(this.handleError<DocumentoConsulta>('deleteDocumentoConsulta'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
