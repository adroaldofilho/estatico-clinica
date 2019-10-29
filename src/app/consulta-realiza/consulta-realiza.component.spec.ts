import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaRealizaComponent } from './consulta-realiza.component';

describe('ConsultaRealizaComponent', () => {
  let component: ConsultaRealizaComponent;
  let fixture: ComponentFixture<ConsultaRealizaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaRealizaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaRealizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
