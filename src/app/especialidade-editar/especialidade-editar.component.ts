import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EspecialidadeService } from '../../service/especialidade.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-especialidade-editar',
  templateUrl: './especialidade-editar.component.html',
  styleUrls: ['./especialidade-editar.component.scss']
})
export class EspecialidadeEditarComponent implements OnInit {
  
  especialidadeForm: FormGroup;
  idEspecialidade: number = null;
  nome = '';
  matcher = new MyErrorStateMatcher();

  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: EspecialidadeService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getEspecialidade(this.route.snapshot.params['id']);

    this.especialidadeForm = this.formBuilder.group({
      
      // tslint:disable-next-line: object-literal-key-quotes
      'nome' : [null, Validators.required],
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateEspecialidade(this.idEspecialidade, this.especialidadeForm.value)
      .subscribe((res: any) => {
          // tslint:disable-next-line: no-string-literal
          const id = res['payload'].idEspecialidade;
          this.isLoadingResults = false;
          this.router.navigate(['/especialidade-detalhe', this.idEspecialidade]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  getEspecialidade(id: any) {
    this.api.getEspecialidade(id).subscribe((data: any) => {
      console.log('data = ', data);
      this.idEspecialidade = data['payload'].idEspecialidade;
      this.especialidadeForm.setValue({
        nome: data['payload'].nome
      });
    });
  }
  especialidadeDetalhe() {
    this.router.navigate(['/especialidade-detalhe', this.idEspecialidade]);
  }
}
