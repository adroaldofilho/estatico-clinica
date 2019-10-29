import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadeNovoComponent } from './especialidade-novo.component';

describe('EspecialidadeNovoComponent', () => {
  let component: EspecialidadeNovoComponent;
  let fixture: ComponentFixture<EspecialidadeNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialidadeNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadeNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
