import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersByGenderComponent } from './workers-by-gender.component';

describe('WorkersByGenderComponent', () => {
  let component: WorkersByGenderComponent;
  let fixture: ComponentFixture<WorkersByGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkersByGenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkersByGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
