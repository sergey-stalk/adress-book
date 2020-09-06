import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { HttpService } from './http.service';
import {CreateRecordFormComponent} from '../shared/components/create-record-form/create-record-form.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

const httpDataMock = {
  surname: 'matveev',
  name: 'serhii',
  phone: '+79261234567',
  patronymic: 'illich',
  favorite: false
};

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTableData', () => {
    it('should return table data payload', () => {
      spyOn(service, 'getTableData').and.returnValue(of([httpDataMock]).pipe(
        delay(1)
      ));
      service.getTableData();
      expect(service.getTableData).toHaveBeenCalled();
    });
  });

  describe('putData', () => {
    it('should put table data payload', () => {
      spyOn(service, 'putData');
      service.putData([httpDataMock]);
      expect(service.putData).toHaveBeenCalledWith([httpDataMock]);
    });
  });
});
