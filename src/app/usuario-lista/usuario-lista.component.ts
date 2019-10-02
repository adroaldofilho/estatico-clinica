import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from 'src/model/usuario';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.scss']
})
export class UsuarioListaComponent implements OnInit {

  displayedColumns: string[] = [ 'nome', 'email', 'telefone', 'acao'];
  dataSource: Usuario[];

  isLoadingResults = true;

  constructor(private router: Router, private route: ActivatedRoute, private api: UsuarioService) { }

  ngOnInit() {
    let currentUser: Usuario;
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('currentUser = ', currentUser);
    const token = localStorage.getItem('token');
    console.log('token = ', token);

    this.api.getUsuarios()
    .subscribe(res => {
      console.log(res);
      // tslint:disable-next-line: no-string-literal
      this.dataSource = res['payload'];
      console.log(this.dataSource);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
