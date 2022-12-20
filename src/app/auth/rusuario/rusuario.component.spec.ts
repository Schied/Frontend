import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RusuarioComponent } from './rusuario.component';

describe('RusuarioComponent', () => {
  let component: RusuarioComponent;
  let fixture: ComponentFixture<RusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RusuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
