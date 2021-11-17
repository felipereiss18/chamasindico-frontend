import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivoComunicadoComponent } from './ativo-comunicado.component';

describe('AtivoComunicadoComponent', () => {
  let component: AtivoComunicadoComponent;
  let fixture: ComponentFixture<AtivoComunicadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtivoComunicadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtivoComunicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
