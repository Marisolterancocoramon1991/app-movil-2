import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplachPage } from './splach.page';

describe('SplachPage', () => {
  let component: SplachPage;
  let fixture: ComponentFixture<SplachPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SplachPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
