import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClinicaService } from '../../service/clinica.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-clinica-novo',
  templateUrl: './clinica-novo.component.html',
  styleUrls: ['./clinica-novo.component.scss']
})
export class ClinicaNovoComponent implements OnInit {
  clinicaForm: FormGroup;
  idClinica: number = null;
  nome = '';
  telefone = '';
  endereco = '';
  matcher = new MyErrorStateMatcher();

  isLoadingResults = false;

  constructor(private router: Router, private api: ClinicaService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.clinicaForm = this.formBuilder.group({
      
      // tslint:disable-next-line: object-literal-key-quotes
      'nome' : [null, Validators.required],
      // tslint:disable-next-line: object-literal-key-quotes
      'telefone' : [null, Validators.required],
      // tslint:disable-next-line: object-literal-key-quotes
      'endereco' : [null, Validators.required],
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addClinica(this.clinicaForm.value)
      .subscribe((res: any) => {
          // tslint:disable-next-line: no-string-literal
          const id = res['payload'].idClinica;
          this.isLoadingResults = false;
          this.router.navigate(['/clinica-detalhe', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
