import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QbConfigComponent } from './qb-config.component';

describe('QbConfigComponent', () => {
  let component: QbConfigComponent;
  let fixture: ComponentFixture<QbConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QbConfigComponent]
    });
    fixture = TestBed.createComponent(QbConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
