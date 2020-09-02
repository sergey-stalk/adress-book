import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecordFormComponent } from './create-record-form.component';

describe('CreateRecordFormComponent', () => {
  let component: CreateRecordFormComponent;
  let fixture: ComponentFixture<CreateRecordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRecordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*describe( 'onInit', () => {
    it('should ', () => {

    });
  });*/
});


