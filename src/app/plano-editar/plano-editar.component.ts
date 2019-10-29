import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-plano-editar',
  templateUrl: './plano-editar.component.html',
  styleUrls: ['./plano-editar.component.scss']
})
export class PlanoEditarComponent implements OnInit {
  
  planoForm: FormGroup;
  idPlano: number = null;
  nome = '';
  email = '';
  telefone = '';
  url = '';
  matcher = new MyErrorStateMatcher();

  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: PlanoService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getPlano(this.route.snapshot.params['id']);

    this.planoForm = this.formBuilder.group({
      
      // tslint:disable-next-line: object-literal-key-quotes
      'nome' : [null, Validators.required],
      // tslint:disable-next-line: object-literal-key-quotes
      'email' : [null, Validators.required],
      // tslint:disable-next-line: object-literal-key-quotes
      'telefone' : [null, Validators.required],
      // tslint:disable-next-line: object-literal-key-quotes
      'url' : [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updatePlano(this.idPlano, this.planoForm.value)
      .subscribe((res: any) => {
          // tslint:disable-next-line: no-string-literal
          const id = res['payload'].idPlano;
          this.isLoadingResults = false;
          this.router.navigate(['/plano-detalhe', this.idPlano]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  getPlano(id: any) {
    this.api.getPlano(id).subscribe((data: any) => {
      console.log('data = ', data);
      this.idPlano = data['payload'].idPlano;
      this.planoForm.setValue({
        nome: data['payload'].nome,
        email: data['payload'].email,
        telefone: data['payload'].telefone,
        url: data['payload'].url
      });
    });
  }

  planoDetalhe() {
    this.router.navigate(['/plano-detalhe', this.idPlano]);
  }
}
