import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioInquilinoComponent } from './formulario-inquilino.component';

describe('FormularioInquilinoComponent', () => {
  let component: FormularioInquilinoComponent;
  let fixture: ComponentFixture<FormularioInquilinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioInquilinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioInquilinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
