import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-especialidade-novo',
  templateUrl: './especialidade-novo.component.html',
  styleUrls: ['./especialidade-novo.component.scss']
})
export class EspecialidadeNovoComponent implements OnInit {
  especialidadeForm: FormGroup;
  idEspecialidade: number = null;
  nome = '';
  matcher = new MyErrorStateMatcher();

  isLoadingResults = false;

  constructor(private router: Router, private api: EspecialidadeService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.especialidadeForm = this.formBuilder.group({
      
      // tslint:disable-next-line: object-literal-key-quotes
      'nome' : [null, Validators.required],
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addEspecialidade(this.especialidadeForm.value)
      .subscribe((res: any) => {
        console.log('res Especialidade', res);
          // tslint:disable-next-line: no-string-literal
          const id = res['payload'].idEspecialidade;
          this.isLoadingResults = false;
          this.router.navigate(['/especialidade-detalhe', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
