import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatsidenavComponent } from './matsidenav.component';

describe('MatsidenavComponent', () => {
  let component: MatsidenavComponent;
  let fixture: ComponentFixture<MatsidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatsidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatsidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
