import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivosCorrespondenciaComponent } from './ativos-correspondencia.component';

describe('AtivosCorrespondenciaComponent', () => {
  let component: AtivosCorrespondenciaComponent;
  let fixture: ComponentFixture<AtivosCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtivosCorrespondenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtivosCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
