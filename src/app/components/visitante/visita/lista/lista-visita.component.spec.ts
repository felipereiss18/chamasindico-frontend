import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVisitaComponent } from './lista-visita.component';

describe('ListaVisitaComponent', () => {
  let component: ListaVisitaComponent;
  let fixture: ComponentFixture<ListaVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaVisitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
