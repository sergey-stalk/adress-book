import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../../core/http.service';
import {IFormError, IRowData, ITableData} from '../../entities/models/main-model.interfaces';
import {inputPhoneRegExp, inputTextRegExp} from '../../entities/constants/reg-exp.const';

@Component({
  selector: 'app-create-record-form',
  templateUrl: './create-record-form.component.html',
  styleUrls: ['./create-record-form.component.scss']
})

export class CreateRecordFormComponent implements OnInit {
  constructor(private httpService: HttpService) { }

  errors: IFormError = {
    surname: false,
    name: false,
    patronymic: false,
    phone: false
  };

  createRecordForm: FormGroup;

  tableData: IRowData[];

  ngOnInit(): void {
    this.listenOnTableDataLoaded();
    this.listenOnDataUpdated();
    this.initForm();
  }

  onSubmit(): void {
    if (this.createRecordForm.valid) {
      this.tableData.push({...this.createRecordForm.value, favorite: false});
      this.httpService.putData(this.tableData);
      this.createRecordForm.reset();
      this.resetError();
      console.log(this.createRecordForm);
    } else {
      this.getError();
    }
  }

  getError(): void {
    const formKeys = Object.keys(this.createRecordForm.controls);

    this.errors = formKeys.reduce(( acc, cur) => ({ ...acc, [cur]: !!this.createRecordForm.get(cur).errors}), {}) as IFormError;
  }

  resetError(): void {
    const errorKey = Object.keys(this.errors);

    this.errors = errorKey.reduce(( acc, cur) => ({ ...acc, [cur]: false }), {}) as IFormError;
  }

  private getInitialFormControl(validatorPattern: RegExp = inputPhoneRegExp): FormControl {
    return new FormControl('', [Validators.required, Validators.pattern(validatorPattern)]);
  }

  private listenOnTableDataLoaded(): void {
    this.httpService.getTableData().subscribe(({ data }: ITableData) => {
      this.tableData = [ ...data ];
    });
  }

  private listenOnDataUpdated(): void {
    this.httpService.dataUpdated.subscribe((data: IRowData[]) => {
      this.tableData = data;
    });
  }

  private initForm(): void {
    this.createRecordForm = new FormGroup({
      surname: this.getInitialFormControl(),
      name: this.getInitialFormControl(),
      patronymic: this.getInitialFormControl(),
      phone: this.getInitialFormControl(inputTextRegExp)
    });
  }
}
