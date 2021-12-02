import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrespondenciaRelatorioComponent } from './correspondencia-relatorio.component';

describe('CorrespondenciaRelatorioComponent', () => {
  let component: CorrespondenciaRelatorioComponent;
  let fixture: ComponentFixture<CorrespondenciaRelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrespondenciaRelatorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrespondenciaRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
