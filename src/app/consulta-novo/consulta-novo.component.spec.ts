import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaNovoComponent } from './consulta-novo.component';

describe('ConsultaNovoComponent', () => {
  let component: ConsultaNovoComponent;
  let fixture: ComponentFixture<ConsultaNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
