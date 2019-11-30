import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import brLocale from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Usuario } from 'src/model/usuario';
import { Message, SelectItem } from 'primeng/api';
import { ProfissionalClinica } from 'src/model/profissionalclinica';
import { ProfissionalService } from 'src/service/profissional.service';
import { ConsultaService } from 'src/service/consulta.service';
import { Consulta } from 'src/model/consulta';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Profissional } from 'src/model/profissional';
import { Util } from '../util/util';
import { AutoComplete } from 'primeng/autocomplete';

@Component({
  selector: 'app-consulta-lista',
  templateUrl: './consulta-lista.component.html',
  styleUrls: ['./consulta-lista.component.scss']
})


export class ConsultaListaComponent implements OnInit {
  
  @ViewChild('op', {static: false}) op: OverlayPanel;
  
  msgs: Message[] = [];

  profissionais: SelectItem[];
  listaProfissionais: ProfissionalClinica[];
  selectedProfissional: SelectItem;
  filteredProfissionais: SelectItem[];
  isLoadingResults = true;
  consultas: Consulta[];
  isProfissionalLogado = false;
  events: any[];
  options: any;
  usuarioLogado: Usuario;
  paciente: Usuario = {
    idUsuario: 0,
    email: '',
    nome: '',
    picture: null,
    senha: '',
    telefone: '',
    tipoUsuario: ''
  }
  consulta: Consulta = {
    idConsulta: 0,
    idProfissionalClinica: 0,
    dataHoraConsulta: null,
    idPlano: 0,
    idUsuario: 0,
    statusConsulta: 0
  }

  usuarioProfissional: Usuario = {
    idUsuario: 0,
    email: '',
    nome: '',
    picture: null,
    senha: '',
    telefone: '',
    tipoUsuario: ''
  }

  profissional: Profissional = {
    idProfissional: 0,
    idUsuario: 0,
    picture: null
  }

  util = new Util();


  dataHoraConsulta: string;

  constructor(private profissionalApi: ProfissionalService,
              private consultaApi: ConsultaService) {
    
   }

  ngOnInit() {

    this.usuarioLogado = JSON.parse(localStorage.getItem('currentUser'));
    
    this.getProfissionais();
    let self = this;
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
      titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
      contentHeight: 'auto',
      businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        daysOfWeek: [ 1, 2, 3, 4 , 5], // Monday - Thursday
      
        startTime: '08:00', // a start time (10am in this example)
        endTime: '18:00', // an end time (6pm in this example)
      },
      minTime: '08:00:00',
      maxTime: '20:00:00',
      locale: 'pt-br',
      defaultView: 'timeGridDay',
      allDaySlot: false,
      slotDuration: '00:30',
      weekends: false,
      selectable: true,
      nowIndicator: true,
      buttonText: {today: 'hoje', month: 'mês', week: 'semana', day: 'dia', list: 'lista'},
      eventClick: function(info) {
          self.mostraConsulta(info);
      }
    };
    let device = localStorage.getItem('device');
    let header = {};
    if (device === 'mobile'){
        header = {
          left: 'prev,next',
          center: 'title',
          right: 'today',
      }
    } else {
        header = {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay',
        }
    }
    this.options = {...this.options, header};
  }

  getProfissionais() {
    this.profissionais = [];
    this.profissionalApi.getProfissionaisClinica(1)
      .subscribe((data: any) => {
        // tslint:disable-next-line: no-string-literal
        this.listaProfissionais = data['payload'];
        
        this.listaProfissionais.map(profissional => {
          let profissionalItem = {
            label: '',
            value: {}
          };
          profissionalItem['label'] = profissional.Profissional.Usuario.nome;
          profissionalItem['value'] = profissional.Profissional.Usuario.nome;
          profissionalItem['profissional'] = profissional;
          this.profissionais.push(profissionalItem);
          if (this.usuarioLogado.tipoUsuario === 'Profissional' && 
              profissional.Profissional.Usuario.idUsuario === this.usuarioLogado.idUsuario) {
              this.selectedProfissional = profissionalItem;
              this.getConsultas(profissionalItem);
              this.isProfissionalLogado = true;
          }
        });
        if (this.profissionais.length === 1 && !this.isProfissionalLogado) {
          this.selectedProfissional = this.profissionais[0];
          this.getConsultas(this.selectedProfissional);
        }
        this.isLoadingResults = false;
      });
  }

  selectProfissional(e) {
    console.log('selectProfissional.e', e);
    console.log('selectedProfissional', this.selectedProfissional);
  }

  filterProfissionais(event){
    this.filteredProfissionais = [];
    for(let i = 0; i < this.profissionais.length; i++) {
        let profissional = this.profissionais[i];
        if(profissional.value.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.filteredProfissionais.push(profissional);
        }
    }
  }
  getConsultas(profissionalItem) {
    this.events = [];
    console.log('onselect profissional', profissionalItem);
    this.consultaApi.getConsultas(profissionalItem.profissional.idProfissionalClinica)
    .subscribe(res => {
      console.log(res);
      // tslint:disable-next-line: no-string-literal
      this.consultas = res['payload'];
      console.log('Consultas', this.consultas);

      this.consultas.map(consulta => {
        let consultaItem = {
          title: '',
          start: null,
          end: null,
          backgroundColor: '',
          extendProps: {
            consulta: consulta
          }
        };
        console.log('consulta: ', consulta);
        consultaItem['title'] = consulta.Usuario.nome;
        let timeStart = new Date(consulta.dataHoraConsulta);
        consultaItem['start'] = timeStart;
        let timeEnd = new Date(timeStart);

        timeEnd.setMinutes(timeStart.getMinutes() + 30);
        consultaItem['end'] = timeEnd;
        switch(consulta.statusConsulta){
          case 2: {
            consultaItem['backgroundColor'] = 'green';
            consultaItem['borderColor'] = 'green';
            break;
          }
          case 3: {
            consultaItem['backgroundColor'] = 'orange';
            consultaItem['borderColor'] = 'orange';
            break;
          }
        }
        // if (consulta.statusConsulta === 2){
        //   consultaItem['backgroundColor'] = 'green';
        //   consultaItem['borderColor'] = 'green';
        // }
        this.events = [...this.events, consultaItem]
      });
      console.log('consultas: ', this.events);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  mostraConsulta(info){
    this.paciente = info.event.extendedProps.extendProps.consulta.Usuario;
    console.log('info', info);
    this.consulta = info.event.extendedProps.extendProps.consulta;
    this.usuarioProfissional = info.event.extendedProps.extendProps.consulta.ProfissionalClinica.Profissional.Usuario;
    this.dataHoraConsulta = this.util.formatDate(this.consulta.dataHoraConsulta);
    this.op.toggle(info.jsEvent);
  }
  
  confirmaConsulta(){
    this.consulta.statusConsulta = 2;
    this.consultaApi.update(this.consulta.idConsulta, this.consulta)
    .subscribe(res => {
        // tslint:disable-next-line: no-string-literal
        const id = res['payload'].idEspecialidade;
        this.isLoadingResults = false;
        this.getConsultas(this.selectedProfissional);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
      this.op.hide();
  }

  cancelaConsulta(){
    this.consulta.statusConsulta = 2;
    this.consultaApi.deleteConsulta(this.consulta.idConsulta)
    .subscribe(res => {
        this.getConsultas(this.selectedProfissional);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
      this.op.hide();
  }

  pacienteChegou(){
    this.consulta.statusConsulta = 3;
    this.consultaApi.update(this.consulta.idConsulta, this.consulta)
    .subscribe(res => {
        // tslint:disable-next-line: no-string-literal
        const id = res['payload'].idEspecialidade;
        this.isLoadingResults = false;
        this.getConsultas(this.selectedProfissional);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
      this.op.hide();
    }
}
