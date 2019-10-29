import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteNovoComponent } from './paciente-novo.component';

describe('PacienteNovoComponent', () => {
  let component: PacienteNovoComponent;
  let fixture: ComponentFixture<PacienteNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
