import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoDetalheComponent } from './plano-detalhe.component';

describe('PlanoDetalheComponent', () => {
  let component: PlanoDetalheComponent;
  let fixture: ComponentFixture<PlanoDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
