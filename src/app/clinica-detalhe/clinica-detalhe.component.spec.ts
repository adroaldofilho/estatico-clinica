import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaDetalheComponent } from './clinica-detalhe.component';

describe('ClinicaDetalheComponent', () => {
  let component: ClinicaDetalheComponent;
  let fixture: ComponentFixture<ClinicaDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
