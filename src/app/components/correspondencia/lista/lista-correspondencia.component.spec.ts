import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCorrespondenciaComponent } from './lista-correspondencia.component';

describe('ListaCorrespondenciaComponent', () => {
  let component: ListaCorrespondenciaComponent;
  let fixture: ComponentFixture<ListaCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCorrespondenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
