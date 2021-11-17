import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaComunicadoComponent } from './lista-comunicado.component';

describe('ListaComunicadoComponent', () => {
  let component: ListaComunicadoComponent;
  let fixture: ComponentFixture<ListaComunicadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaComunicadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaComunicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
