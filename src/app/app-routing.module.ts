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

const routes: Routes = [
  {
    path: 'consulta-lista',
    component: ConsultaListaComponent,
    data: { title: 'Consultas' }
  },
  {
    path: 'paciente-lista',
    component: PacienteListaComponent,
    data: { title: 'Lista de Pacientes' }
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
