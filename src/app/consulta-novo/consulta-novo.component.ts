import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/service/usuario.service';
import { ProfissionalService } from 'src/service/profissional.service';
import { ConsultaService } from 'src/service/consulta.service';
import { Profissional } from 'src/model/profissional';
import {SelectItem, ConfirmationService, Message} from 'primeng/api';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { FullCalendar } from 'primeng/fullcalendar';
import { PlanoService } from 'src/service/plano.service';
import { Plano } from 'src/model/plano';
import { Consulta } from 'src/model/consulta';
import { ProfissionalClinica } from 'src/model/profissionalclinica';
import { Util } from '../util/util';

@Component({
  selector: 'app-consulta-novo',
  templateUrl: './consulta-novo.component.html',
  styleUrls: ['./consulta-novo.component.scss'],
  providers: [ConfirmationService]
})



export class ConsultaNovoComponent implements OnInit {
  

  // @ViewChild('fc', {static: false}) fc: FullCalendar;
  msgs: Message[] = [];

  profissionais: SelectItem[];
  listaProfissionais: ProfissionalClinica[];
  selectedProfissional: SelectItem;
  filteredProfissionais: SelectItem[];
  planos: Plano[];
  filteredPlanos: Plano[];
  plano: Plano;
  consulta: Consulta = {
    idConsulta: 0,
    idPlano: 0,
    idProfissionalClinica: 0,
    idUsuario: 0,
    dataHoraConsulta: null,
    statusConsulta: 0
  };
  consultas: Consulta[];
  idUsuario: number;
  paciente: Usuario = { idUsuario: 0,
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    picture: null,
    tipoUsuario: ''};
    isLoadingResults = true;

  events: any[];
  options: any;
  minimumDate: Date;

  util = new Util();

  constructor(private route: ActivatedRoute, 
              private api: UsuarioService, 
              private router: Router,
              private profissionalApi: ProfissionalService,
              private consultaApi: ConsultaService,
              private confirmationService: ConfirmationService,
              private planoApi: PlanoService) {
  }

  ngOnInit() {
    this.idUsuario = this.route.snapshot.params['id'];
    this.getUsuarioDetalhe(this.route.snapshot.params['id']);
    this.getProfissionais();
    this.getPlanos();
    let self = this;

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
      
      header: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        daysOfWeek: [ 1, 2, 3, 4 , 5], // Monday - Thursday
      
        startTime: '08:00', // a start time (10am in this example)
        endTime: '18:00', // an end time (6pm in this example)
      },
      minTime: '08:00:00',
      maxTime: '20:00:00',
      locale: 'pt-br',
      defaultView: 'timeGridWeek',
      allDaySlot: false,
      slotDuration: '00:30',
      weekends: false,
      selectable: true,
      nowIndicator: true,
      select: function(info) {
        let agora = new Date();
        if (info.start < agora) {
          alert('Marcação de consulta não permitida para esse horário!');
        } else { 
          self.salvaConsulta(info, self.paciente, self.selectedProfissional);
          this.events = this.events;
        }
      }
    };
  }

  getUsuarioDetalhe(id: any) {
    this.api.getUsuario(id)
      .subscribe((data: any) => {
        // tslint:disable-next-line: no-string-literal
        this.paciente = data['payload'];
        this.isLoadingResults = false;
      });
  }

  getPlanos(){
    this.planoApi.getPlanos()
    .subscribe(res => {
      console.log(res);
      // tslint:disable-next-line: no-string-literal
      this.planos = res['payload'];
      console.log(this.planos);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
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
          console.log('profissional: ', profissional);
          profissionalItem['label'] = profissional.Profissional.Usuario.nome;
          profissionalItem['value'] = profissional.Profissional.Usuario.nome;
          profissionalItem['profissional'] = profissional;
          this.profissionais.push(profissionalItem);
        });
        console.log('profissionais mapeados: ', this.profissionais);
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

  filterPlanos(event){
    this.filteredPlanos = [];
    for(let i = 0; i < this.planos.length; i++) {
        if(this.planos[i].nome.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.filteredPlanos.push(this.planos[i]);
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
          end: null
        };
        console.log('consulta: ', consulta);
        consultaItem['title'] = consulta.Usuario.nome;
        let timeStart = new Date(consulta.dataHoraConsulta);
        consultaItem['start'] = timeStart;
        // let timeEnd = new Date(consulta.dataHoraConsulta);
        // console.log('type of timeStart', typeof(timeStart));
        let timeEnd = new Date(timeStart);

        timeEnd.setMinutes(timeStart.getMinutes() + 30);
        consultaItem['end'] = timeEnd;
        if (consulta.statusConsulta === 2){
          consultaItem['backgroundColor'] = 'green';
          consultaItem['borderColor'] = 'green';
        }
        this.events = [...this.events, consultaItem]
        // this.events.push(consultaItem);
      });
      console.log('consultas: ', this.events);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });;
  }

  salvaConsulta(event: any, paciente: Usuario, profissional: any){

    if (profissional === undefined){
      alert("Selecione o médico para marcar a consulta!!")
    } else if (this.plano === undefined){
      alert("Selecione o plano de saúde para marcar a consulta!!")
    } else {
      const profissional1: Profissional = profissional.profissional.Profissional;
      
      console.log('profissional', profissional); 
      console.log('nome', this.paciente.nome);
     
      this.consulta.idUsuario = this.paciente.idUsuario;
      this.consulta.idProfissionalClinica = profissional.profissional.idProfissionalClinica;
      this.consulta.dataHoraConsulta = event.start;
      this.consulta.statusConsulta = 1;
      this.consulta.idPlano = this.plano.idPlano;
      let dataHoraConsulta = this.util.formatDate(event.startStr);
      this.confirmationService.confirm({
        message: `Confirma a marcação da consulta na data/hora ${dataHoraConsulta} para o paciente ${paciente.nome} com o Dr(a). ${profissional1.Usuario.nome}?`, 
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            let eventAdded = {
              "title": paciente.nome,
              "start": event.startStr,
              "end": event.endStr
            }
            this.events = [...this.events, eventAdded]
            //this.events.push(eventAdded);
            
            this.consultaApi.addConsulta(this.consulta)
            .subscribe((res: any) => {
                // tslint:disable-next-line: no-string-literal
                const id = res['payload'].idConsulta;
                this.isLoadingResults = false;
                // this.router.navigate(['/clinica-detalhe', id]);
              }, (err: any) => {
                console.log(err);
                this.isLoadingResults = false;
              });

            this.msgs = [{severity:'info', summary:'Confirmada', detail:'Consulta salva!'}];
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Cancelada', detail:'Consulta cancelada'}];
        }
      });
      console.log('events', this.events);
    }   
  }
  
}
