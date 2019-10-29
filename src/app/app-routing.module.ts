import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';
import { UsuarioDetalheComponent } from './usuario-detalhe/usuario-detalhe.component';
import { UsuarioNovoComponent } from './usuario-novo/usuario-novo.component';
import { UsuarioEditarComponent } from './usuario-editar/usuario-editar.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { ConsultaListaComponent } from './consulta-lista/consulta-lista.component';
import { PacienteListaComponent } from './paciente-lista/paciente-lista.component';
import { EspecialidadeListaComponent } from './especialidade-lista/especialidade-lista.component';
import { EspecialidadeDetalheComponent } from './especialidade-detalhe/especialidade-detalhe.component';
import { EspecialidadeNovoComponent } from './especialidade-novo/especialidade-novo.component';
import { EspecialidadeEditarComponent } from './especialidade-editar/especialidade-editar.component';
import { PlanoListaComponent } from './plano-lista/plano-lista.component';
import { PlanoDetalheComponent } from './plano-detalhe/plano-detalhe.component';
import { PlanoNovoComponent } from './plano-novo/plano-novo.component';
import { PlanoEditarComponent } from './plano-editar/plano-editar.component';
import { PacienteDetalheComponent } from './paciente-detalhe/paciente-detalhe.component';
import { PacienteNovoComponent } from './paciente-novo/paciente-novo.component';
import { PacienteEditarComponent } from './paciente-editar/paciente-editar.component';
import { ConsultaNovoComponent } from './consulta-novo/consulta-novo.component';
import { ClinicaListaComponent } from './clinica-lista/clinica-lista.component';
import { ClinicaNovoComponent } from './clinica-novo/clinica-novo.component';
import { ClinicaDetalheComponent } from './clinica-detalhe/clinica-detalhe.component';
import { ConsultaRealizaComponent } from './consulta-realiza/consulta-realiza.component';

const routes: Routes = [
  {
    path: 'consulta-lista',
    component: ConsultaListaComponent,
    data: { title: 'Consultas' }
  },
  {
    path: 'consulta-novo/:id', // id do Paciente
    component: ConsultaNovoComponent,
    data: { title: 'Consultas' }
  },
  {
    path: 'consulta-realiza/:id', // id da Consulta
    component: ConsultaRealizaComponent,
    data: { title: 'Consultas' }
  },
  {
    path: 'clinica-lista',
    component: ClinicaListaComponent,
    data: { title: 'Lista de Clinicas' }
  },
  {
    path: 'clinica-novo',
    component: ClinicaNovoComponent,
    data: { title: 'Incluir Clinica' }
  },
  {
    path: 'clinica-detalhe/:id',
    component: ClinicaDetalheComponent,
    data: { title: 'Detalhe da Clinica' }
  },
  {
    path: 'paciente-lista',
    component: PacienteListaComponent,
    data: { title: 'Lista de Pacientes' }
  },
  {
    path: 'paciente-detalhe/:id',
    component: PacienteDetalheComponent,
    data: { title: 'Detalhe do Paciente' }
  },
  {
    path: 'paciente-editar/:id',
    component: PacienteEditarComponent,
    data: { title: 'Detalhe do Paciente' }
  },
  {
    path: 'paciente-novo',
    component: PacienteNovoComponent,
    data: { title: 'Adicionar Paciente' }
  },
  {
    path: 'usuario-lista',
    component: UsuarioListaComponent,
    data: { title: 'Lista de usuarios' }
  },
  {
    path: 'usuario-detalhe/:id',
    component: UsuarioDetalheComponent,
    data: { title: 'Detalhe do usuario' }
  },
  {
    path: 'usuario-novo',
    component: UsuarioNovoComponent,
    data: { title: 'Adicionar usuario' }
  },
  {
    path: 'usuario-editar/:id',
    component: UsuarioEditarComponent,
    data: { title: 'Editar o usuario' }
  },
  {
    path: 'especialidade-lista',
    component: EspecialidadeListaComponent,
    data: { title: 'Lista de especialidades' }
  },
  {
    path: 'especialidade-detalhe/:id',
    component: EspecialidadeDetalheComponent,
    data: { title: 'Detalhe da especialidade' }
  },
  {
    path: 'especialidade-novo',
    component: EspecialidadeNovoComponent,
    data: { title: 'Adicionar especialidade' }
  },
  {
    path: 'especialidade-editar/:id',
    component: EspecialidadeEditarComponent,
    data: { title: 'Editar especialidade' }
  },
  {
    path: 'plano-lista',
    component: PlanoListaComponent,
    data: { title: 'Lista de planos de saúde' }
  },
  {
    path: 'plano-detalhe/:id',
    component: PlanoDetalheComponent,
    data: { title: 'Detalhe de plano de saúde' }
  },
  {
    path: 'plano-novo',
    component: PlanoNovoComponent,
    data: { title: 'Adicionar plano de saúde' }
  },
  {
    path: 'plano-editar/:id',
    component: PlanoEditarComponent,
    data: { title: 'Editar plano de saúde' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  }
  // ,
  // { path: '',
  //   redirectTo: '/usuario-lista',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
