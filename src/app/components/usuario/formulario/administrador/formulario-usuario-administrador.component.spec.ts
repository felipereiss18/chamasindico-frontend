import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioUsuarioAdministradorComponent } from './formulario-usuario-administrador.component';

describe('FormularioUsuarioAdministradorComponent', () => {
  let component: FormularioUsuarioAdministradorComponent;
  let fixture: ComponentFixture<FormularioUsuarioAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioUsuarioAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioUsuarioAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
