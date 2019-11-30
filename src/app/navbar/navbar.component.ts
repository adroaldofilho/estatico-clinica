import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/model/usuario';
import { AuthenticationService } from 'src/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  usuarioLogado: Usuario;
  mensagemBemVindo: string = '';
  title = 'Dr. Adroaldo';
  isAdministrador = false;
  isMobile = false;

  constructor(private auth: AuthenticationService, private router: Router) { }

  logout() {
    this.auth.logout();
    this.router.navigate(['']);
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('currentUser') !== null) {
      this.usuarioLogado =  JSON.parse(localStorage.getItem('currentUser'));
      this.mensagemBemVindo = `Bem vindo, ${this.usuarioLogado.nome}!`;
      if (this.usuarioLogado.tipoUsuario === 'Administrador'){
        this.isAdministrador = true;
      } else {
        this.isAdministrador = false;
      }
    }
    var device = localStorage.getItem('device');
    if (device === 'mobile'){
      this.isMobile = true;
    }
    // console.log('usuarioLogado', this.usuarioLogado);
    return (localStorage.getItem('currentUser') !== null);
  }
  
  ngOnInit() {
  }

}
