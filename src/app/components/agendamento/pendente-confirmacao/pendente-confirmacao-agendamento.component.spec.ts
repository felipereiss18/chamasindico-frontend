import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendenteConfirmacaoAgendamentoComponent } from './pendente-confirmacao-agendamento.component';

describe('PendenteConfirmacaoAgendamentoComponent', () => {
  let component: PendenteConfirmacaoAgendamentoComponent;
  let fixture: ComponentFixture<PendenteConfirmacaoAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendenteConfirmacaoAgendamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendenteConfirmacaoAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
