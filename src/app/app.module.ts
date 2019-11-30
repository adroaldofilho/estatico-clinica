import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';
import { UsuarioDetalheComponent } from './usuario-detalhe/usuario-detalhe.component';
import { UsuarioNovoComponent } from './usuario-novo/usuario-novo.component';
import { UsuarioEditarComponent } from './usuario-editar/usuario-editar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { DeviceDetectorModule } from 'ngx-device-detector';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTabsModule } from '@angular/material';
import { MatMenuModule} from '@angular/material/menu';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import {PickListModule} from 'primeng/picklist';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ListboxModule} from 'primeng/listbox';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {OrderListModule} from 'primeng/orderlist';

import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './login/login.component';
import { ConsultaListaComponent } from './consulta-lista/consulta-lista.component';
import { PacienteListaComponent } from './paciente-lista/paciente-lista.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EspecialidadeListaComponent } from './especialidade-lista/especialidade-lista.component';
import { EspecialidadeDetalheComponent } from './especialidade-detalhe/especialidade-detalhe.component';
import { EspecialidadeNovoComponent } from './especialidade-novo/especialidade-novo.component';
import { EspecialidadeEditarComponent } from './especialidade-editar/especialidade-editar.component';
import { PlanoListaComponent } from './plano-lista/plano-lista.component';
import { PlanoNovoComponent } from './plano-novo/plano-novo.component';
import { PlanoDetalheComponent } from './plano-detalhe/plano-detalhe.component';
import { PlanoEditarComponent } from './plano-editar/plano-editar.component';
import { PacienteDetalheComponent } from './paciente-detalhe/paciente-detalhe.component';
import { PacienteNovoComponent } from './paciente-novo/paciente-novo.component';
import { PacienteEditarComponent } from './paciente-editar/paciente-editar.component';
import { ConsultaNovoComponent } from './consulta-novo/consulta-novo.component';
import { ClinicaListaComponent } from './clinica-lista/clinica-lista.component';
import { ClinicaNovoComponent } from './clinica-novo/clinica-novo.component';
import { ClinicaDetalheComponent } from './clinica-detalhe/clinica-detalhe.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioListaComponent,
    UsuarioDetalheComponent,
    UsuarioNovoComponent,
    UsuarioEditarComponent,
    MenuComponent,
    LoginComponent,
    ConsultaListaComponent,
    PacienteListaComponent,
    EspecialidadeListaComponent,
    EspecialidadeDetalheComponent,
    EspecialidadeNovoComponent,
    EspecialidadeEditarComponent,
    PlanoListaComponent,
    PlanoNovoComponent,
    PlanoDetalheComponent,
    PlanoEditarComponent,
    PacienteDetalheComponent,
    PacienteNovoComponent,
    PacienteEditarComponent,
    ConsultaNovoComponent,
    ClinicaListaComponent,
    ClinicaNovoComponent,
    ClinicaDetalheComponent,
    ConsultaRealizaComponent,
    LandingPageComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    LayoutModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    FlexLayoutModule,
    ShowHidePasswordModule,
    FullCalendarModule,
    NgMaterialMultilevelMenuModule,
    MatMenuModule,
    AngularDualListBoxModule,
    PickListModule,
    AutoCompleteModule,
    ListboxModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    OverlayPanelModule,
    MatTabsModule,
    OrderListModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConsultaRealizaComponent } from './consulta-realiza/consulta-realiza.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavbarComponent } from './navbar/navbar.component';

ConfirmDialog.prototype.appendContainer = function(): void {
  if (this.appendTo) {
    if (this.appendTo === 'body')
      document.body.appendChild(this.el.nativeElement);
    else
      this.domHandler.appendChild(this.container, this.appendTo);
  }
};