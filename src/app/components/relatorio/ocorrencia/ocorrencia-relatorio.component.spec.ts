import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorrenciaRelatorioComponent } from './ocorrencia-relatorio.component';

describe('OcorrenciaRelatorioComponent', () => {
  let component: OcorrenciaRelatorioComponent;
  let fixture: ComponentFixture<OcorrenciaRelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcorrenciaRelatorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcorrenciaRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
