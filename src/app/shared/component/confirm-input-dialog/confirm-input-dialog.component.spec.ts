import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmInputDialogComponent } from './confirm-input-dialog.component';

describe('ConfirmInputDialogComponent', () => {
  let component: ConfirmInputDialogComponent;
  let fixture: ComponentFixture<ConfirmInputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmInputDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
