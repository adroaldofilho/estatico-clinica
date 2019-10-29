import { Component } from '@angular/core';
import { AuthenticationService } from 'src/service/authentication.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  username: string;
  hide = true;
  password: string;
  title = 'auth-guard-demo';
  isLoadingResults = true;

  constructor(private auth: AuthenticationService, private router: Router) {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  login(): void {
    if (this.username !== '' && this.password !== '') {

      const credentials = {
        email: this.username,
        senha: this.password
      };
      this.auth.getToken(credentials)
      .subscribe((res: any) => {
          const token = res.token;
          this.isLoadingResults = false;
          localStorage.setItem('currentUser', JSON.stringify(res.usuario));
          localStorage.setItem('token', res.token);
          this.router.navigate(['consulta-lista']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
          alert('Senha ou email inválidos!!');
        });


      // if (this.auth.login(this.username, this.password)) {
      //   this.router.navigate(['usuario-lista']);
      // } else {
      //   alert('Wrong username or password');
      // }
    }
  }
}
