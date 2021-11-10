import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioGaragemComponent } from './formulario-garagem.component';

describe('FormularioGaragemComponent', () => {
  let component: FormularioGaragemComponent;
  let fixture: ComponentFixture<FormularioGaragemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioGaragemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioGaragemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
