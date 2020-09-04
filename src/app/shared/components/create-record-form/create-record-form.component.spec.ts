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
    component.createRecordForm = [{
      name: 'surname',
      value: '',
      inputType: 'input',
      id: 'surnameInput',
      required: true,
      pattern: 'validatorPattern'
    }, {
      name: 'name',
      value: '',
      inputType: 'input',
      id: 'nameInput',
      required: true,
      pattern: 'inputTextRegExp'
    }, {
      name: 'patronymic',
      value: '',
      inputType: 'input',
      id: 'patronymicInput',
      required: true,
      pattern: 'inputTextRegExp'
    }, {
      name: 'phone',
      value: '',
      inputType: 'input',
      id: 'phoneInput',
      required: true,
      pattern: 'inputPhoneRegExp'
    }];

    component.ngOnInit();
    fixture.detectChanges();
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
      expect(component.tableData).toBeUndefined();
      expect(httpService.getTableData).toHaveBeenCalled();

      tick(1);
      fixture.detectChanges();
      expect(component.tableData).toEqual([httpDataMock]);
    }));

    it('should render input components', () => {

    });
  });
});


