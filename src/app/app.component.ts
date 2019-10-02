import { Component } from '@angular/core';
import { AuthenticationService } from 'src/service/authentication.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/model/usuario';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  usuarioLogado: Usuario;
  title = 'estatico-clinica';

  constructor(private auth: AuthenticationService, private router: Router) {
    this.usuarioLogado =  JSON.parse(localStorage.getItem('currentUser'));
    console.log('usuarioLogado', this.usuarioLogado);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['']);
  }

  isAuthenticated(): boolean {
    return (localStorage.getItem('currentUser') !== null);
  }
}
