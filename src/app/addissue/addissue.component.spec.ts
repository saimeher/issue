import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddissueComponent } from './addissue.component';

describe('AddissueComponent', () => {
  let component: AddissueComponent;
  let fixture: ComponentFixture<AddissueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddissueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
