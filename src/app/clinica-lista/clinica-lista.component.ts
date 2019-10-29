import { Component, OnInit } from '@angular/core';
import { ClinicaService } from '../../service/clinica.service';
import { Clinica } from 'src/model/clinica';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clinica-lista',
  templateUrl: './clinica-lista.component.html',
  styleUrls: ['./clinica-lista.component.scss']
})
export class ClinicaListaComponent implements OnInit {

  displayedColumns: string[] = [ 'nome', 'telefone', 'endereco', 'acao'];
  dataSource: Clinica[];

  isLoadingResults = true;

  constructor(private router: Router, private route: ActivatedRoute, private api: ClinicaService) { }

  ngOnInit() {
    this.api.getClinicas()
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
