import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVisitanteComponent } from './lista-visitante.component';

describe('ListaVisitanteComponent', () => {
  let component: ListaVisitanteComponent;
  let fixture: ComponentFixture<ListaVisitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaVisitanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaVisitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
