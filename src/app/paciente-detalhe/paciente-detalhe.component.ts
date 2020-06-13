import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../model/usuario';
import { ConsultaService } from 'src/service/consulta.service';
import { Util } from '../util/util';

@Component({
  selector: 'app-paciente-detalhe',
  templateUrl: './paciente-detalhe.component.html',
  styleUrls: ['./paciente-detalhe.component.scss']
})

export class PacienteDetalheComponent implements OnInit {

  usuario: Usuario = {
    idUsuario: 0,
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    picture: null,
    tipoUsuario: ''
  };
  isLoadingResults = true;
  constructor(private route: ActivatedRoute, private api: UsuarioService, private router: Router, private consultaApi: ConsultaService) { }
  prontuario = '';
  device = localStorage.getItem('device');
  linhaTracejada = '';
  util = new Util();

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.getUsuarioDetalhe(this.route.snapshot.params['id']);
    if (this.device === 'mobile') {
      this.linhaTracejada = ''
    }
    else {
      this.linhaTracejada = ' - - - - - - - - - - - - - - - - - - - - ';
    }

    this.consultaApi.getConsultaByUsuario(this.route.snapshot.params['id'])
      .subscribe((data: any) => {
        // tslint:disable-next-line: no-string-literal
        this.prontuario = '';
        let consultas = data['payload'];
        consultas.map((consulta => {
          consulta['dataHoraFormatada'] = this.util.formatDate(consulta.dataHoraConsulta);
          this.prontuario = this.prontuario + ' - - - - - - - - - - - - - - - - - - - - ' + 
          consulta['dataHoraFormatada'] + 
          ' - - - - - - - - - - - - - - - - - - - -\n' +
          consulta.DocumentoConsulta[0].textoDocumentoConsulta + '\n\n';
        }));
      });
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
        this.router.navigate(['/paciente-lista']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }
}
