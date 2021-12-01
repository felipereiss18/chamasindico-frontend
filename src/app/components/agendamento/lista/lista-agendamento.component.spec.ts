import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAgendamentoComponent } from './formulario-agendamento.component';

describe('FormularioAgendamentoComponent', () => {
  let component: ListaAgendamentoComponent;
  let fixture: ComponentFixture<ListaAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAgendamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
