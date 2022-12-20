import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcontraComponent } from './rcontra.component';

describe('RcontraComponent', () => {
  let component: RcontraComponent;
  let fixture: ComponentFixture<RcontraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RcontraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RcontraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
