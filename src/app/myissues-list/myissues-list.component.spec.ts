import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyissuesListComponent } from './myissues-list.component';

describe('MyissuesListComponent', () => {
  let component: MyissuesListComponent;
  let fixture: ComponentFixture<MyissuesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyissuesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyissuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
