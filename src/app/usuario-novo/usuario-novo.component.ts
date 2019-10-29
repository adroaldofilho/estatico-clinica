import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-usuario-novo',
  templateUrl: './usuario-novo.component.html',
  styleUrls: ['./usuario-novo.component.scss']
})
export class UsuarioNovoComponent implements OnInit {
  usuarioForm: FormGroup;
  idUsuario: number = null;
  nome = '';
  email = '';
  telefone = '';
  senha = '';
  tipoUsuario = '';
  matcher = new MyErrorStateMatcher();

  tipoUsuarios = [
    {value: 'Paciente', viewValue: 'Paciente'},
    {value: 'Secretaria', viewValue: 'Secretaria'},
    {value: 'Profissional', viewValue: 'Profissional'},
    {value: 'Administrador', viewValue: 'Administrador'}
  ];

  isLoadingResults = false;

  constructor(private router: Router, private api: UsuarioService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      
      // tslint:disable-next-line: object-literal-key-quotes
      'nome' : [null, Validators.required],
      // tslint:disable-next-line: object-literal-key-quotes
      'email' : [null, Validators.required],
      // tslint:disable-next-line: object-literal-key-quotes
      'telefone' : [null, Validators.required],
      // tslint:disable-next-line: object-literal-key-quotes
      'senha' : [null, Validators.required],
      // tslint:disable-next-line: object-literal-key-quotes
      'tipoUsuario' : [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addUsuario(this.usuarioForm.value)
      .subscribe((res: any) => {
          // tslint:disable-next-line: no-string-literal
          const id = res['payload'].idUsuario;
          this.isLoadingResults = false;
          this.router.navigate(['/usuario-detalhe', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
