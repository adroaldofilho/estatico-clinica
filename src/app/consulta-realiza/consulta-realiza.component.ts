import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/service/usuario.service';
import { ProfissionalService } from 'src/service/profissional.service';
import { ConsultaService } from 'src/service/consulta.service';
import { PlanoService } from 'src/service/plano.service';
import { Consulta } from 'src/model/consulta';
import { Plano } from 'src/model/plano';
import { DocumentoConsulta } from 'src/model/documentoconsulta';
import { DocumentoConsultaService } from 'src/service/documentoconsulta.service';
import { Util } from '../util/util';

@Component({
  selector: 'app-consulta-realiza',
  templateUrl: './consulta-realiza.component.html',
  styleUrls: ['./consulta-realiza.component.scss']
})
export class ConsultaRealizaComponent implements OnInit {
  paciente: Usuario = { idUsuario: 0,
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    picture: null,
    tipoUsuario: ''};
    isLoadingResults = true;
  
  consulta: Consulta = {
    idConsulta: 0,
    idPlano: 0,
    idProfissionalClinica: 0,
    dataHoraConsulta: null,
    idUsuario: 0,
    statusConsulta: 0
  }
  
  consultas: Consulta[];

  documentoConsulta: DocumentoConsulta = {
    idDocumentoConsulta: 0,
    idConsulta: 0,
    textoDocumentoConsulta: ''
  }
  textoConsulta: string;
  tituloConsulta = '';
  util = new Util();

  textoConsultaSelecionada = '';

  constructor(private route: ActivatedRoute, 
    private api: UsuarioService, 
    private router: Router,
    private documentoConsultaApi: DocumentoConsultaService,
    private consultaApi: ConsultaService,
    private planoApi: PlanoService) { }

  ngOnInit() {
    this.getConsulta(this.route.snapshot.params['id']);
    
    // this.getUsuarioDetalhe(this.route.snapshot.params['id']);
  }
  
  getUsuarioDetalhe(id: any) {
    this.api.getUsuario(id)
      .subscribe((data: any) => {
        // tslint:disable-next-line: no-string-literal
        this.paciente = data['payload'];
        this.isLoadingResults = false;
      });
  }
  getConsulta(id: any){
    this.consultaApi.getConsulta(id)
      .subscribe((data: any) => {
        // tslint:disable-next-line: no-string-literal
        this.consulta = data['payload'];
        this.paciente = this.consulta.Usuario;
        this.documentoConsulta.idConsulta = this.consulta.idConsulta;
        this.tituloConsulta = this.paciente.nome + ' - ' + this.util.formatDate(this.consulta.dataHoraConsulta);
        if (this.consulta.DocumentoConsulta[0] !== undefined) {
          this.textoConsulta = this.consulta.DocumentoConsulta[0].textoDocumentoConsulta;
          this.documentoConsulta.idDocumentoConsulta = this.consulta.DocumentoConsulta[0].idDocumentoConsulta;
        }
        // this.consultas = this.paciente.Consulta;
        
        this.consultaApi.getConsultaByUsuario(this.paciente.idUsuario)
        .subscribe((data: any) => {
          // tslint:disable-next-line: no-string-literal
          this.consultas = data['payload'];
          this.consultas.map((consulta => {
            consulta['dataHoraFormatada'] = this.util.formatDate(consulta.dataHoraConsulta);
          }));
        });
        this.isLoadingResults = false;
      });
  }
  
  salvaDocumentoConsulta(){
    this.documentoConsulta.textoDocumentoConsulta = this.textoConsulta;
    if (this.documentoConsulta.idDocumentoConsulta === 0) {
      this.documentoConsultaApi.addDocumentoConsulta(this.documentoConsulta)
      .subscribe((data: any) => {
        this.documentoConsulta = data['payload'];
      });
    } else {
      this.documentoConsultaApi.updateDocumentoConsulta(this.documentoConsulta.idDocumentoConsulta, this.documentoConsulta)
      .subscribe((data: any) => {
        this.documentoConsulta = data['payload'];
      });
    }
    this.consultaApi.getConsultaByUsuario(this.paciente.idUsuario)
    .subscribe((data: any) => {
      // tslint:disable-next-line: no-string-literal
      this.consultas = data['payload'];
      this.consultas.map((consulta => {
        consulta['dataHoraFormatada'] = this.util.formatDate(consulta.dataHoraConsulta);
      }));
    });
    console.log('this.textoConsulta: ', this.textoConsulta);
  }

  selecionaConsulta(consulta){
    this.textoConsultaSelecionada = '';
    if (consulta.DocumentoConsulta[0] !== undefined) {
      this.textoConsultaSelecionada = consulta.DocumentoConsulta[0].textoDocumentoConsulta;
    }
  }
}
