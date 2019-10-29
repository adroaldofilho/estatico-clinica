import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadeEditarComponent } from './especialidade-editar.component';

describe('EspecialidadeEditarComponent', () => {
  let component: EspecialidadeEditarComponent;
  let fixture: ComponentFixture<EspecialidadeEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialidadeEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadeEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
