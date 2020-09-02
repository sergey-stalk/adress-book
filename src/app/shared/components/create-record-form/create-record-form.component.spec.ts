import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CreateRecordFormComponent} from './create-record-form.component';
import {of} from 'rxjs';
import {HttpService} from '../../../core/http.service';
import {delay} from 'rxjs/operators';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

const httpDataMock = {
  surname: 'Matveev',
  name: 'Serhii',
  phone: '+79261234567',
  patronymic: 'illich',
  favorite: false
};

describe('CreateRecordFormComponent', () => {
  let component: CreateRecordFormComponent;
  let fixture: ComponentFixture<CreateRecordFormComponent>;
  let httpService: HttpService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRecordFormComponent],
      providers: [HttpService],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecordFormComponent);
    component = fixture.componentInstance;

    httpService = TestBed.get(HttpService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should init listenOnTableDataLoaded', fakeAsync(() => {
      spyOn(httpService, 'getTableData').and.returnValue(of([httpDataMock]).pipe(
        delay(1)
      ));
      component.ngOnInit();

      fixture.detectChanges();

      expect(component.tableData).toBeUndefined();
      expect(httpService.getTableData).toHaveBeenCalled();

      tick(1);
      console.log(component);
      expect(component.tableData).toEqual([httpDataMock]);
    }));
  });
});


