import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadeListaComponent } from './especialidade-lista.component';

describe('EspecialidadeListaComponent', () => {
  let component: EspecialidadeListaComponent;
  let fixture: ComponentFixture<EspecialidadeListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialidadeListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadeListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
