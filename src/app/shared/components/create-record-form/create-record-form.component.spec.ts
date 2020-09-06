import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CreateRecordFormComponent} from './create-record-form.component';
import {HttpService} from '../../../core/http.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {delay} from 'rxjs/operators';
import {of} from 'rxjs';

const httpDataMock = {
  surname: 'matveev',
  name: 'serhii',
  phone: '+79261234567',
  patronymic: 'illich',
  favorite: false
};

const formDataMock = {
  surname: 'matveev',
  name: 'serhii',
  phone: '+79261234567',
  patronymic: 'illich',
};

const wrongFormDataMock = {
  surname: 'matvee16v',
  name: 'serhii',
  phone: '+792612345g7',
  patronymic: 'illich//',
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
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecordFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    httpService = TestBed.get(HttpService);
    component.tableData = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be created http service', () => {
    const httpServiceInstance = TestBed.get(HttpService);
    expect(httpServiceInstance).toBeTruthy();
  });

  describe('onInit', () => {
    it('should init listen On TableData Loaded', fakeAsync(() => {
      spyOn(httpService, 'getTableData').and.returnValue(of({data: [httpDataMock]}).pipe(
        delay(1)
      ));
      component.ngOnInit();
      expect(component.tableData).toEqual([]);
      expect(httpService.getTableData).toHaveBeenCalled();

      tick(1);
      fixture.detectChanges();
      expect(component.tableData).toEqual([httpDataMock]);
    }));

    // view rendering
    it('should render input fields', () => {

      const compiledForm = fixture.debugElement.nativeElement;

      const surnameInput = compiledForm.querySelector('input[id="surnameInput"]');
      const nameInput = compiledForm.querySelector('input[id="nameInput"]');
      const patronymicInput = compiledForm.querySelector('input[id="patronymicInput"]');
      const phoneInput = compiledForm.querySelector('input[id="phoneInput"]');

      expect(surnameInput).toBeTruthy();
      expect(nameInput).toBeTruthy();
      expect(nameInput).toBeTruthy();
      expect(nameInput).toBeTruthy();
    });

    // all form validation
    it('should check createRecordForm validation mechanism', () => {
      const createRecordForm = component.createRecordForm;
      expect(createRecordForm.valid).toBeFalsy();

      const surnameFormControl = createRecordForm.controls.surname;
      surnameFormControl.setValue('Smith');
      expect(createRecordForm.valid).toBeFalsy();

      const nameFormControl = createRecordForm.controls.name;
      nameFormControl.setValue('Fred');
      expect(createRecordForm.valid).toBeFalsy();

      const patronymicFormControl = createRecordForm.controls.patronymic;
      patronymicFormControl.setValue('William');
      expect(createRecordForm.valid).toBeFalsy();

      const phoneFormControl = createRecordForm.controls.phone;
      phoneFormControl.setValue('+79267654321');
      expect(createRecordForm.valid).toBeTruthy();
    });

    // test input fields validation mechanism separately
    it('should test surname validation mechanism', () => {
      const surnameInputField = component.createRecordForm.controls.surname;

      expect(surnameInputField.valid).toBeFalsy();

      surnameInputField.setValue('Smith');
      expect(surnameInputField.valid).toBeTruthy();

      surnameInputField.setValue('Smith123');
      expect(surnameInputField.valid).toBeFalsy();

      surnameInputField.setValue('Smith%$+');
      expect(surnameInputField.valid).toBeFalsy();
    });


    it('should test name validation process', () => {
      const nameInputField = component.createRecordForm.controls.name;

      expect(nameInputField.valid).toBeFalsy();

      nameInputField.setValue('Will');
      expect(nameInputField.valid).toBeTruthy();

      nameInputField.setValue('Will123');
      expect(nameInputField.valid).toBeFalsy();

      nameInputField.setValue('Will%$+');
      expect(nameInputField.valid).toBeFalsy();
    });


    it('should test patronymic validation process', () => {
      const patronymicInputField = component.createRecordForm.controls.patronymic;

      expect(patronymicInputField.valid).toBeFalsy();

      patronymicInputField.setValue('Illich');
      expect(patronymicInputField.valid).toBeTruthy();

      patronymicInputField.setValue('Illich123');
      expect(patronymicInputField.valid).toBeFalsy();

      patronymicInputField.setValue('Illich^&@');
      expect(patronymicInputField.valid).toBeFalsy();
    });


    it('should test phone validation mechanism', () => {
      const phoneInputField = component.createRecordForm.controls.phone;

      expect(phoneInputField.valid).toBeFalsy();

      phoneInputField.setValue('+79261234567');
      expect(phoneInputField.valid).toBeTruthy();

      phoneInputField.setValue('+79261234567123');
      expect(phoneInputField.valid).toBeFalsy();

      phoneInputField.setValue('+79261234%$+');
      expect(phoneInputField.valid).toBeFalsy();

      phoneInputField.setValue('+7926a234567');
      expect(phoneInputField.valid).toBeFalsy();
    });

    // test input fields errors generating
    it('should test surname text field errors producing', () => {
      const surnameField = component.createRecordForm.controls.surname;

      expect(surnameField.errors.required).toBeTruthy();

      surnameField.setValue('Donatello');
      expect(surnameField.errors).toBeNull();

      surnameField.setValue('Donatello123');
      expect(surnameField.hasError('pattern')).toBeTruthy();

      surnameField.setValue('Donatello%$+');
      expect(surnameField.hasError('pattern')).toBeTruthy();
    });

    it('should test name text field errors producing', () => {
      const nameField = component.createRecordForm.controls.name;

      expect(nameField.errors.required).toBeTruthy();

      nameField.setValue('Leonard');
      expect(nameField.errors).toBeNull();

      nameField.setValue('Leonard123');
      expect(nameField.hasError('pattern')).toBeTruthy();

      nameField.setValue('Leonard%$+');
      expect(nameField.hasError('pattern')).toBeTruthy();
    });

    it('should test patronymic text field errors producing', () => {
      const patronymicField = component.createRecordForm.controls.patronymic;

      expect(patronymicField.errors.required).toBeTruthy();

      patronymicField.setValue('Kuzmich');
      expect(patronymicField.errors).toBeNull();

      patronymicField.setValue('Kuzmich123');
      expect(patronymicField.hasError('pattern')).toBeTruthy();

      patronymicField.setValue('Kuzmich%$+');
      expect(patronymicField.hasError('pattern')).toBeTruthy();
    });

    it('should test phone text field errors producing', () => {
      const phoneField = component.createRecordForm.controls.phone;

      expect(phoneField.errors.required).toBeTruthy();

      phoneField.setValue('+79261234567');
      expect(phoneField.errors).toBeNull();

      phoneField.setValue('+79261234567123');
      expect(phoneField.hasError('pattern')).toBeTruthy();

      phoneField.setValue('+79261234567%$+');
      expect(phoneField.hasError('pattern')).toBeTruthy();

      phoneField.setValue('+7926a234567');
      expect(phoneField.hasError('pattern')).toBeTruthy();
    });

    describe('onSubmit', () => {
      it('should form be filled and valid', fakeAsync(() => {
        const form = component.createRecordForm;
        form.setValue(formDataMock);
        expect(form.get('name').value).toBeTruthy();
        expect(form.get('surname').value).toBeTruthy();
        expect(form.get('patronymic').value).toBeTruthy();
        expect(form.get('phone').value).toBeTruthy();
        expect(form.valid).toBeTruthy();
        component.tableData.push(httpDataMock);
        expect(form.valid).toBeTruthy();
        component.onSubmit();
        spyOn(httpService, 'putData');
        httpService.putData([httpDataMock]);
        expect(httpService.putData).toHaveBeenCalledWith([httpDataMock]);
        form.reset();
        expect(form.get('name').value).toBeFalsy();
        expect(form.get('surname').value).toBeFalsy();
        expect(form.get('patronymic').value).toBeFalsy();
        expect(form.get('phone').value).toBeFalsy();
        expect(form.valid).toBeFalsy();
      }));

      it('should errors', () => {
        expect(component.errors.name).toBeFalsy();
        expect(component.errors.surname).toBeFalsy();
        expect(component.errors.patronymic).toBeFalsy();
        expect(component.errors.phone).toBeFalsy();
        const form = component.createRecordForm;
        form.setValue(formDataMock);
        component.getError();
        expect(component.errors.name).toBeFalsy();
        expect(component.errors.surname).toBeFalsy();
        expect(component.errors.patronymic).toBeFalsy();
        expect(component.errors.phone).toBeFalsy();
        form.setValue(wrongFormDataMock);
        component.getError();
        expect(component.errors.name).toBeFalsy();
        expect(component.errors.surname).toBeTruthy();
        expect(component.errors.patronymic).toBeTruthy();
        expect(component.errors.phone).toBeTruthy();
      });

      it('should reset errors and get errors', () => {
        component.errors.name = true;
        component.errors.phone = true;
        component.errors.surname = true;
        component.errors.patronymic = true;
        component.resetError();
        expect(component.errors.name).toBeFalsy();
        expect(component.errors.surname).toBeFalsy();
        expect(component.errors.patronymic).toBeFalsy();
        expect(component.errors.phone).toBeFalsy();
      });
    });
  });
});


