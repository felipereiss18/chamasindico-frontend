import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioOcorrenciaComponent } from './formulario-ocorrencia.component';

describe('FormularioOcorrenciaComponent', () => {
  let component: FormularioOcorrenciaComponent;
  let fixture: ComponentFixture<FormularioOcorrenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioOcorrenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioOcorrenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
