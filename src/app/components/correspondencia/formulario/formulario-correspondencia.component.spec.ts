import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCorrespondenciaComponent } from './formulario-correspondencia.component';

describe('FormularioCorrespondenciaComponent', () => {
  let component: FormularioCorrespondenciaComponent;
  let fixture: ComponentFixture<FormularioCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCorrespondenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
