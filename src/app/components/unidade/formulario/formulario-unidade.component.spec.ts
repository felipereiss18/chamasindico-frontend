import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioUnidadeComponent } from './formulario-unidade.component';

describe('FormularioUnidadeComponent', () => {
  let component: FormularioUnidadeComponent;
  let fixture: ComponentFixture<FormularioUnidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioUnidadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioUnidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
