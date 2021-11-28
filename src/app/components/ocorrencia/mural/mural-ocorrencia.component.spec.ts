import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuralOcorrenciaComponent } from './mural-ocorrencia.component';

describe('MuralOcorrenciaComponent', () => {
  let component: MuralOcorrenciaComponent;
  let fixture: ComponentFixture<MuralOcorrenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuralOcorrenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuralOcorrenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
