import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioVisitanteComponent } from './formulario-visitante.component';

describe('FormularioVisitanteComponent', () => {
  let component: FormularioVisitanteComponent;
  let fixture: ComponentFixture<FormularioVisitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioVisitanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioVisitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
