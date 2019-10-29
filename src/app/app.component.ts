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
  mensagemBemVindo: string = '';
  title = 'estatico-clinica';




  constructor(private auth: AuthenticationService, private router: Router) {
    
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['']);
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('currentUser') !== null) {
      this.usuarioLogado =  JSON.parse(localStorage.getItem('currentUser'));
      this.mensagemBemVindo = `Bem vindo, ${this.usuarioLogado.nome}!`;
    }
    
    // console.log('usuarioLogado', this.usuarioLogado);
    return (localStorage.getItem('currentUser') !== null);
  }
}
