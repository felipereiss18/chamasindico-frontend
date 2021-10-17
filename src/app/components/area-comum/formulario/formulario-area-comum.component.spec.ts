import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAreaComumComponent } from './formulario-area-comum.component';

describe('FormularioAreaComumComponent', () => {
  let component: FormularioAreaComumComponent;
  let fixture: ComponentFixture<FormularioAreaComumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioAreaComumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAreaComumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
