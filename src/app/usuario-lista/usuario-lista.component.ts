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
