import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicaService } from '../../service/clinica.service';
import { Clinica } from '../../model/clinica';
import { ProfissionalService } from 'src/service/profissional.service';
import { Profissional } from 'src/model/profissional';
import { ProfissionalClinicaService } from 'src/service/profissionalclinica.service';
import { ProfissionalClinica } from 'src/model/profissionalclinica';

@Component({
  selector: 'app-clinica-detalhe',
  templateUrl: './clinica-detalhe.component.html',
  styleUrls: ['./clinica-detalhe.component.scss']
})
export class ClinicaDetalheComponent implements OnInit {

  clinica: Clinica = { idClinica: 0,
                     nome: '',
                     telefone: '',
                     endereco: '',
                     picture: null};
  profissionais: Profissional[];
  profissionaisClinica: ProfissionalClinica[];
  isLoadingResults = true;
  format = { add: 'Adcionar', remove: 'Remover', all: 'Todos', none: 'Nenhum',
        draggable: true, locale: 'pt-br' };

 source = [];
//  confirmed = [];
 target = [];
 profissionaisClinicaTela = [];
 profissionaisTela = [];
 
 
 constructor(private route: ActivatedRoute, 
     private api: ClinicaService, 
     private profissionalApi: ProfissionalService,
     private router: Router) { }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.getClinicaDetalhe(this.route.snapshot.params['id']);
    this.getProfissionais();
    // this.getProfissionaisClinica();
  }

  getClinicaDetalhe(id: any) {
    this.api.getClinica(id)
      .subscribe((data: any) => {
        // tslint:disable-next-line: no-string-literal
        this.clinica = data['payload'];
        console.log(this.clinica);
        this.isLoadingResults = false;
      });
  }

  getProfissionaisClinica() {
    this.profissionalApi.getProfissionaisClinica(this.clinica.idClinica)
      .subscribe((res: any) => {
        // tslint:disable-next-line: no-string-literal
        console.log('profissionaisClinica --> res', res);
        this.profissionaisClinica = res['payload'];
        console.log('profissionaisClinica', this.profissionaisClinica);
        // this.target = this.profissionaisClinica.map((profissionalClinica, i) => {
        //   let targetItem = [{}];
        //   targetItem['nomeProfissional'] = profissionalClinica.Profissional.Usuario.nome;
        //   targetItem['idProfissional'] = profissional.idProfissional;
        //   profissional.ProfissionalEspecialidades.map((profissionalespecialidade) => {
        //     targetItem['nomeEspecialidade'] = profissionalespecialidade.Especialidade.nome;
        //   });
          
        //   return targetItem;
        // });

        // console.log('source', this.source);
        this.isLoadingResults = false;
      });
  }

  getProfissionais() {
    this.profissionalApi.getProfissionais()
      .subscribe((data: any) => {
        // tslint:disable-next-line: no-string-literal
        this.profissionais = data['payload'];
        
        this.source = this.profissionais.map((profissional, i) => {
          let sourceItem = [{}];
          sourceItem['nomeProfissional'] = profissional.Usuario.nome;
          sourceItem['idProfissional'] = profissional.idProfissional;
          profissional.ProfissionalEspecialidades.map((profissionalespecialidade) => {
            sourceItem['nomeEspecialidade'] = profissionalespecialidade.Especialidade.nome;
          });
          
          return sourceItem;
        });
        console.log('this.clinica.idClinica = ', this.clinica.idClinica);
        this.profissionalApi.getProfissionaisClinica(this.clinica.idClinica)
        .subscribe((res: any) => {
          // tslint:disable-next-line: no-string-literal
          console.log('profissionaisClinica --> res = ', res);
          this.profissionaisClinica = res['payload'];
          console.log('profissionaisClinica', this.profissionaisClinica);
          this.target = this.profissionaisClinica.map((profissionalClinica, i) => {
            let targetItem = [{}];
            targetItem['nomeProfissional'] = profissionalClinica.Profissional.Usuario.nome;
            targetItem['idProfissional'] = profissionalClinica.Profissional.idProfissional;
            profissionalClinica.Profissional.ProfissionalEspecialidades.map((profissionalespecialidade) => {
              targetItem['nomeEspecialidade'] = profissionalespecialidade.Especialidade.nome;
            });
            
            return targetItem;
          });
  
          console.log('target', this.target);

          if (this.source.length === this.target.length){
            this.source = [];
          } else {
            this.source.forEach((sourceItem, indexSource) => {
              this.target.forEach(targetItem => {
                if (sourceItem['idProfissional'] === targetItem['idProfissional']){
                  this.source.splice(indexSource, 1);
                }
              });
            });
          }
          this.profissionaisTela = this.source;
          this.profissionaisClinicaTela = this.target; 
          this.isLoadingResults = false;
        });

        console.log('source', this.source);
        this.isLoadingResults = false;
      });
  }

  incluiProfissionalClinica(e){
    
    let target: any = [];
    
    for(let i = 0; i < e.items.length; i++ ){
      let profissionalClinica = {
        idClinica: this.clinica.idClinica
      };
      profissionalClinica['idProfissional'] = e.items[i].idProfissional;
      target.push(profissionalClinica);
      this.api.addProfissionalClinica(profissionalClinica)
      .subscribe((data: any) => {
        // tslint:disable-next-line: no-string-literal
        let profissionalClinicaAdded = data['payload'];
        // this.confirmed[i]['idProfissionalClinica'] = profissionalClinicaAdded.idProfissionalClinica;
        this.isLoadingResults = false;
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
    }
    // console.log('confirmed', this.confirmed);
  }

  excluiProfissionalClinica(e){
    console.log('excluiProfissionalClinica', e);
    
    let target: any = [];
    
    for(let i = 0; i < e.items.length; i++ ){
      let profissionalClinica = {
        idProfissional: ''
        
      }
      profissionalClinica['idProfissional'] = e.items[i].idProfissional;
      profissionalClinica['idClinica'] = this.clinica.idClinica;
      console.log('profissionalClinica: ', profissionalClinica);
      this.api.removeProfissionalClinica(profissionalClinica)
      .subscribe(res => {
        this.isLoadingResults = false;
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
);
    }
    // console.log('confirmed', this.confirmed);
  }

  deleteClinica(id: any) {
    this.isLoadingResults = true;
    this.api.deleteClinica(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/clinica-lista']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
