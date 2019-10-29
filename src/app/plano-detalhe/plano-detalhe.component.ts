import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanoService } from '../../service/plano.service';
import { Plano } from '../../model/plano';

@Component({
  selector: 'app-plano-detalhe',
  templateUrl: './plano-detalhe.component.html',
  styleUrls: ['./plano-detalhe.component.scss']
})
export class PlanoDetalheComponent implements OnInit {

  plano: Plano = { idPlano: 0,
                     nome: '',
                     telefone: '',
                     url: '',
                     email: ''
                     };
  isLoadingResults = true;
  constructor(private route: ActivatedRoute, private api: PlanoService, private router: Router) { }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.getPlanoDetalhe(this.route.snapshot.params['id']);
  }

  getPlanoDetalhe(id: any) {
    this.api.getPlano(id)
      .subscribe((data: any) => {
        // tslint:disable-next-line: no-string-literal
        this.plano = data['payload'];
        console.log(this.plano);
        this.isLoadingResults = false;
      });
  }

  deletePlano(id: any) {
    this.isLoadingResults = true;
    this.api.deletePlano(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/plano-lista']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
