import { Component, OnInit } from '@angular/core';
import { EspecialidadeService } from '../../service/especialidade.service';
import { Especialidade } from 'src/model/especialidade';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-especialidade-lista',
  templateUrl: './especialidade-lista.component.html',
  styleUrls: ['./especialidade-lista.component.scss']
})
export class EspecialidadeListaComponent implements OnInit {

  displayedColumns: string[] = [ 'nome' , 'acao'];
  dataSource: Especialidade[];

  isLoadingResults = true;

  constructor(private router: Router, private route: ActivatedRoute, private api: EspecialidadeService) { }

  ngOnInit() {
    this.api.getEspecialidades()
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
