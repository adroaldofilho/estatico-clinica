import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-paciente-editar',
  templateUrl: './paciente-editar.component.html',
  styleUrls: ['./paciente-editar.component.scss']
})
export class PacienteEditarComponent implements OnInit {
  
  usuarioForm: FormGroup;
  idUsuario: number = null;
  nome = '';
  email = '';
  telefone = '';
  matcher = new MyErrorStateMatcher();

  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: UsuarioService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUsuario(this.route.snapshot.params['id']);

    this.usuarioForm = this.formBuilder.group({
      
      // tslint:disable-next-line: object-literal-key-quotes
      'nome' : [null, Validators.required],
      // tslint:disable-next-line: object-literal-key-quotes
      'email' : [null, Validators.required],
      // tslint:disable-next-line: object-literal-key-quotes
      'telefone' : [null, Validators.required],
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateUsuario(this.idUsuario, this.usuarioForm.value)
      .subscribe((res: any) => {
          // tslint:disable-next-line: no-string-literal
          const id = res['payload'].idUsuario;
          this.isLoadingResults = false;
          this.router.navigate(['/paciente-detalhe', this.idUsuario]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  getUsuario(id: any) {
    this.api.getUsuario(id).subscribe((data: any) => {
      console.log('data = ', data);
      this.idUsuario = data['payload'].idUsuario;
      this.usuarioForm.setValue({
        nome: data['payload'].nome,
        email: data['payload'].email,
        telefone: data['payload'].telefone
      });
    });
  }
  pacienteDetalhe() {
    this.router.navigate(['/paciente-detalhe', this.idUsuario]);
  }


}
