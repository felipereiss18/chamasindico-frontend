import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaPrincipalRelatorioComponent } from './tela-principal-relatorio.component';

describe('TelaPrincipalRelatorioComponent', () => {
  let component: TelaPrincipalRelatorioComponent;
  let fixture: ComponentFixture<TelaPrincipalRelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaPrincipalRelatorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaPrincipalRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
