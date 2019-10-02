import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../model/usuario';

@Component({
  selector: 'app-usuario-detalhe',
  templateUrl: './usuario-detalhe.component.html',
  styleUrls: ['./usuario-detalhe.component.scss']
})
export class UsuarioDetalheComponent implements OnInit {

  usuario: Usuario = { idUsuario: 0,
                     nome: '',
                     email: '',
                     telefone: '',
                     senha: '',
                     picture: null};
  isLoadingResults = true;
  constructor(private route: ActivatedRoute, private api: UsuarioService, private router: Router) { }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.getUsuarioDetalhe(this.route.snapshot.params['id']);
  }

  getUsuarioDetalhe(id: any) {
    this.api.getUsuario(id)
      .subscribe((data: any) => {
        // tslint:disable-next-line: no-string-literal
        this.usuario = data['payload'];
        console.log(this.usuario);
        this.isLoadingResults = false;
      });
  }

  deleteUsuario(id: any) {
    this.isLoadingResults = true;
    this.api.deleteUsuario(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/usuario-lista']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
