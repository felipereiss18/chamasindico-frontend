import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCondominioComponent } from './lista-condominio.component';

describe('ListaCondominioComponent', () => {
  let component: ListaCondominioComponent;
  let fixture: ComponentFixture<ListaCondominioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCondominioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCondominioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
