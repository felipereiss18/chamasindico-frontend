import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarDialogComponent } from './visualizar-dialog.component';

describe('VisualizarDialogComponent', () => {
  let component: VisualizarDialogComponent;
  let fixture: ComponentFixture<VisualizarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
