import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioVisitaComponent } from './formulario-visita.component';

describe('FormularioVisitaComponent', () => {
  let component: FormularioVisitaComponent;
  let fixture: ComponentFixture<FormularioVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioVisitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
