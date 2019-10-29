import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from 'src/model/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-paciente-lista',
  templateUrl: './paciente-lista.component.html',
  styleUrls: ['./paciente-lista.component.scss']
})
export class PacienteListaComponent implements OnInit {

  displayedColumns: string[] = [ 'nome', 'email', 'telefone', 'acao'];
  // dataSource: Usuario[];
  pacientes: Usuario[];
  dataSource = new MatTableDataSource([]);

  isLoadingResults = true;

  constructor(private router: Router, private route: ActivatedRoute, private api: UsuarioService) { }

  ngOnInit() {
    this.api.getPacientes()
    .subscribe(res => {
      console.log(res);
      // tslint:disable-next-line: no-string-literal
      this.pacientes = res['payload'];
      this.dataSource = new MatTableDataSource(this.pacientes);
      console.log(this.dataSource);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
