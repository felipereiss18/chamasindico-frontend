import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCondominioComponent } from './formulario-condominio.component';

describe('FormularioCondominioComponent', () => {
  let component: FormularioCondominioComponent;
  let fixture: ComponentFixture<FormularioCondominioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCondominioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCondominioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
