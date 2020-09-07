import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { TableComponent } from './table.component';
import {HttpService} from '../../../core/http.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

const httpDataMock = {
  surname: 'matveev',
  name: 'serhii',
  phone: '+79261234567',
  patronymic: 'illich',
  favorite: false
};

const tableDataBeforeActionMock = [{
  surname: 'matveev',
  name: 'serhii',
  phone: '+79261234567',
  patronymic: 'illich',
  favorite: false
}, {
  surname: 'matveev',
  name: 'serhii',
  phone: '+79261234567',
  patronymic: 'illich',
  favorite: true
}];

const tableDataAfterActionMock = [{
  surname: 'matveev',
  name: 'serhii',
  phone: '+79261234567',
  patronymic: 'illich',
  favorite: true
}, {
  surname: 'matveev',
  name: 'serhii',
  phone: '+79261234567',
  patronymic: 'illich',
  favorite: false
}];

const tableDataAfterCheckBoxMock = [{
  surname: 'matveev',
  name: 'serhii',
  phone: '+79261234567',
  patronymic: 'illich',
  favorite: false
}, {
  surname: 'matveev',
  name: 'serhii',
  phone: '+79261234567',
  patronymic: 'illich',
  favorite: false
}];

const favoriteCheckBoxMock = {
  id: '1',
  value: true
};


describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let httpService: HttpService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      providers: [HttpService],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    httpService = TestBed.get(HttpService);
    component.tableData = [];
  });

  it('should create table', () => {
    expect(component).toBeTruthy();
  });

  it('should be created http service', () => {
    const httpServiceInstance = TestBed.get(HttpService);
    expect(httpServiceInstance).toBeTruthy();
  });

  describe('onInit', () => {
    it('should init listen On Data Loaded', fakeAsync(() => {
      const spy = spyOn(httpService, 'getTableData').and.returnValue(of({data: [httpDataMock]}).pipe(
        delay(1)
      ));
      component.ngOnInit();
      expect(component.tableData).toEqual([]);
      expect(httpService.getTableData).toHaveBeenCalled();

      tick(1);
      fixture.detectChanges();
      expect(component.tableData).toEqual([httpDataMock]);
    }));
  });

  describe('sortFavorite', () => {
    it('should sort table data by favorite', () => {
      component.sortFavorite(tableDataBeforeActionMock);
      expect(tableDataBeforeActionMock).toEqual(tableDataAfterActionMock);
    });
  });

  describe('deleteRecord', () => {
    it('should delete current item', () => {
      component.tableData = tableDataAfterActionMock;
      expect(component.tableData.length).toEqual(2);
      component.deleteRecord('1');
      const result = tableDataAfterActionMock.filter((item, i) => i !== 1);
      expect(component.tableData.length).toEqual(1);
      expect(component.tableData).toEqual(result);
      spyOn(httpService, 'putData');
      httpService.putData(component.tableData);
      expect(httpService.putData).toHaveBeenCalledWith(component.tableData);
    });
  });

  describe('checkedInput', () => {
    it('should item change status after checked', () => {
      component.tableData = tableDataAfterCheckBoxMock;
      component.checkedInput(favoriteCheckBoxMock);
      tableDataAfterCheckBoxMock[1].favorite = true;
      expect(component.tableData).toEqual(tableDataAfterCheckBoxMock);
      component.checkedInput({ id: '1', value: false });
      tableDataAfterCheckBoxMock[1].favorite = false;
      expect(component.tableData).toEqual(tableDataAfterCheckBoxMock);
      spyOn(httpService, 'putData');
      httpService.putData(component.tableData);
      expect(httpService.putData).toHaveBeenCalledWith(component.tableData);
    });
  });
});
