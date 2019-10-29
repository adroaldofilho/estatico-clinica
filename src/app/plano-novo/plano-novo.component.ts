import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanoService } from '../../service/plano.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-plano-novo',
  templateUrl: './plano-novo.component.html',
  styleUrls: ['./plano-novo.component.scss']
})
export class PlanoNovoComponent implements OnInit {
  planoForm: FormGroup;
  idPlano: number = null;
  nome = '';
  telefone = '';
  url = '';
  email = '';
  matcher = new MyErrorStateMatcher();

  isLoadingResults = false;

  constructor(private router: Router, private api: PlanoService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.planoForm = this.formBuilder.group({
      
      // tslint:disable-next-line: object-literal-key-quotes
      'nome' : [null, Validators.required],
      // tslint:disable-next-line: object-literal-key-quotes
      'telefone' : [null, Validators.required],
      // tslint:disable-next-line: object-literal-key-quotes
      'url' : [null, Validators.required],
      // tslint:disable-next-line: object-literal-key-quotes
      'email' : [null, Validators.required],
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addPlano(this.planoForm.value)
      .subscribe((res: any) => {
          // tslint:disable-next-line: no-string-literal
          const id = res['payload'].idPlano;
          this.isLoadingResults = false;
          this.router.navigate(['/plano-detalhe', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
