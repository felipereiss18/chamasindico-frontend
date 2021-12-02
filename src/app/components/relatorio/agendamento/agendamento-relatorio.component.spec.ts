import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentoRelatorioComponent } from './agendamento-relatorio.component';

describe('AgendamentoRelatorioComponent', () => {
  let component: AgendamentoRelatorioComponent;
  let fixture: ComponentFixture<AgendamentoRelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendamentoRelatorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentoRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
