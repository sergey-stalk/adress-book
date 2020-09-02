import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICheckedEvent, IRowData} from '../../entities/models/main-model.model';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})

export class TableRowComponent implements OnInit {
  @Input() rowData: IRowData;
  @Input() rowId: string;
  @Output() delete = new EventEmitter();
  @Output() checked = new EventEmitter();

  constructor() { }
  ngOnInit(): void {}

  deleteRecord(): void {
    this.delete.emit(this.rowId);
  }

  checkedInput(checkedValue: ICheckedEvent): void {
    this.checked.emit(checkedValue);
  }
}
