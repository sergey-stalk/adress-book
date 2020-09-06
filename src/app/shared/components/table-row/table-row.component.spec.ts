import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowComponent } from './table-row.component';
import {FavoriteCheckboxComponent} from '../favorite-checkbox/favorite-checkbox.component';
import {By} from '@angular/platform-browser';

const rowDataMock = {
  surname: 'matveev',
  name: 'serhii',
  phone: '+79261234567',
  patronymic: 'illich',
  favorite: false
};

describe('TableRowComponent', () => {
  let component: TableRowComponent;
  let fixture: ComponentFixture<TableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRowComponent);
    const tableRowComponent = fixture.debugElement.componentInstance;
    tableRowComponent.rowData = rowDataMock;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('deleteRecord', () => {
    it('should component emit delete action', () => {
      spyOn(component.delete, 'emit');

      const deleteButton = fixture.debugElement.query(By.css('app-delete-button'));

      deleteButton.triggerEventHandler('delete', null);

      fixture.detectChanges();

      expect(component.delete.emit).toHaveBeenCalled();
    });

    it('should component emit checked action', () => {
      spyOn(component.checked, 'emit');

      const deleteButton = fixture.debugElement.query(By.css('app-favorite-checkbox'));

      deleteButton.triggerEventHandler('checked', null);

      fixture.detectChanges();

      expect(component.checked.emit).toHaveBeenCalled();
    });
  });
});
