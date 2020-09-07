import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { FavoriteCheckboxComponent } from './favorite-checkbox.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const rowDataMock = {
  surname: 'matveev',
  name: 'serhii',
  phone: '+79261234567',
  patronymic: 'illich',
  favorite: false
};

describe('FavoriteCheckboxComponent', () => {
  let component: FavoriteCheckboxComponent;
  let fixture: ComponentFixture<FavoriteCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteCheckboxComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCheckboxComponent);
    const checkboxComponent = fixture.debugElement.componentInstance;
    checkboxComponent.rowData = rowDataMock;
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should control init', fakeAsync(() => {
      const compiledCheckbox = fixture.debugElement.nativeElement;

      expect(compiledCheckbox).toBeTruthy();

      const favoriteCheckbox = compiledCheckbox.querySelector('input');

      fixture.detectChanges();

      expect(favoriteCheckbox).toBeTruthy();

    }));

    it('should set favorite control value', () => {
      expect(component.favorite.value).toEqual(rowDataMock.favorite);
    });
  });

  describe('checkedInput', () => {
    it('should emit check box value', () => {

      spyOn(component.checked, 'emit');

      const nativeElement = fixture.nativeElement;
      const checkBox = nativeElement.querySelector('input');
      checkBox.dispatchEvent(new Event('click'));

      fixture.detectChanges();

      expect(component.checked.emit).toHaveBeenCalled();
    });
  });
});
