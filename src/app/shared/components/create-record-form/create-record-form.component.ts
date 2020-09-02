import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../../core/http.service';
import {IFormError, IRowData, ITableData} from '../../entities/models/main-model.model';
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

  createRecordForm = new FormGroup({
    surname: new FormControl('', [Validators.required, Validators.pattern(inputTextRegExp)]),
    name: new FormControl('', [Validators.required, Validators.pattern(inputTextRegExp)]),
    patronymic: new FormControl('', [Validators.required, Validators.pattern(inputTextRegExp)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(inputPhoneRegExp)])
  });

  tableData: IRowData[];

  ngOnInit(): void {
    this.httpService.getTableData().subscribe((tableData: ITableData) => {
      this.tableData = [...tableData.data];
    });

    this.httpService.dataUpdated.subscribe((data: IRowData[]) => {
      this.tableData = data;
    });
  }

  onSubmit(): void {
    if (this.createRecordForm.valid) {
      const tableDataWithFavorite = {...this.createRecordForm.value, favorite: false};

      this.tableData.push(tableDataWithFavorite);
      this.httpService.putData(this.tableData);
      this.createRecordForm.reset();
      this.resetError();
    } else {
      this.getError();
    }
  }

  getError(): void {
    const formKeys = Object.keys(this.createRecordForm.controls);

    this.errors = formKeys.reduce((acc, cur) => ({...acc, [cur]: !!this.createRecordForm.get(cur).errors}), {}) as IFormError;
  }

  resetError(): void {
    const errorKey = Object.keys(this.errors);

    this.errors = errorKey.reduce((acc, cur) => ({...acc, [cur]: false}), {}) as IFormError;
  }
}
