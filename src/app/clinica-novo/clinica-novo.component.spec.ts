import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaNovoComponent } from './clinica-novo.component';

describe('ClinicaNovoComponent', () => {
  let component: ClinicaNovoComponent;
  let fixture: ComponentFixture<ClinicaNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicaNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicaNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
