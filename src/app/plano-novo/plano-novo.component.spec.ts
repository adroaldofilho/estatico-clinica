import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoNovoComponent } from './plano-novo.component';

describe('PlanoNovoComponent', () => {
  let component: PlanoNovoComponent;
  let fixture: ComponentFixture<PlanoNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanoNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
