import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUnidadeComponent } from './lista-unidade.component';

describe('ListaUnidadeComponent', () => {
  let component: ListaUnidadeComponent;
  let fixture: ComponentFixture<ListaUnidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaUnidadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaUnidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
