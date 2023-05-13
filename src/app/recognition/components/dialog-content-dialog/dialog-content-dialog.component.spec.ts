import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentDialogComponent } from './dialog-content-dialog.component';

describe('DialogContentExampleDialogComponent', () => {
  let component: DialogContentDialogComponent;
  let fixture: ComponentFixture<DialogContentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogContentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogContentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
