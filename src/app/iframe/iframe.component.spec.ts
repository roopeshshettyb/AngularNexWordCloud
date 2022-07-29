import { ComponentFixture, TestBed } from '@angular/core/testing';

import { iframeComponent } from './iframe.component';

describe('UploadComponent', () => {
  let component: iframeComponent;
  let fixture: ComponentFixture<iframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [iframeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(iframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
