import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteEditarComponent } from './paciente-editar.component';

describe('PacienteEditarComponent', () => {
  let component: PacienteEditarComponent;
  let fixture: ComponentFixture<PacienteEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
