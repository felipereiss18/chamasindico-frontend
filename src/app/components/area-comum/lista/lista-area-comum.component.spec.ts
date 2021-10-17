import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAreaComumComponent } from './lista-area-comum.component';

describe('ListaAreaComumComponent', () => {
  let component: ListaAreaComumComponent;
  let fixture: ComponentFixture<ListaAreaComumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAreaComumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAreaComumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
