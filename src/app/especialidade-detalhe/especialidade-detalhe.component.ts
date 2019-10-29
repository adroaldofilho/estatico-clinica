import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EspecialidadeService } from '../../service/especialidade.service';
import { Especialidade } from '../../model/especialidade';

@Component({
  selector: 'app-especialidade-detalhe',
  templateUrl: './especialidade-detalhe.component.html',
  styleUrls: ['./especialidade-detalhe.component.scss']
})
export class EspecialidadeDetalheComponent implements OnInit {

  especialidade: Especialidade = { idEspecialidade: 0,
                     nome: ''};

  isLoadingResults = true;
  constructor(private route: ActivatedRoute, private api: EspecialidadeService, private router: Router) { }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.getEspecialidadeDetalhe(this.route.snapshot.params['id']);
  }

  getEspecialidadeDetalhe(id: any) {
    this.api.getEspecialidade(id)
      .subscribe((data: any) => {
        // tslint:disable-next-line: no-string-literal
        this.especialidade = data['payload'];
        console.log(this.especialidade);
        this.isLoadingResults = false;
      });
  }

  deleteEspecialidade(id: any) {
    this.isLoadingResults = true;
    this.api.deleteEspecialidade(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/especialidade-lista']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
