import { Component, OnInit } from '@angular/core';
import { PlanoService } from '../../service/plano.service';
import { Plano } from 'src/model/plano';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plano-lista',
  templateUrl: './plano-lista.component.html',
  styleUrls: ['./plano-lista.component.scss']
})
export class PlanoListaComponent implements OnInit {

  displayedColumns: string[] = [ 'nome', 'telefone', 'acao'];
  dataSource: Plano[];

  isLoadingResults = true;

  constructor(private router: Router, private route: ActivatedRoute, private api: PlanoService) { }

  ngOnInit() {
    this.api.getPlanos()
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
