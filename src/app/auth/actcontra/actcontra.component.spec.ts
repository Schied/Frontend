import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActcontraComponent } from './actcontra.component';

describe('ActcontraComponent', () => {
  let component: ActcontraComponent;
  let fixture: ComponentFixture<ActcontraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActcontraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActcontraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
