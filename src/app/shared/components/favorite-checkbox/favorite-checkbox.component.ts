import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {IRowData} from '../../entities/models/main-model.model';

@Component({
  selector: 'app-favorite-checkbox',
  templateUrl: './favorite-checkbox.component.html',
  styleUrls: ['./favorite-checkbox.component.scss']
})

export class FavoriteCheckboxComponent implements OnInit {
  @Input() rowId: string;
  @Input() rowData: IRowData;
  @Output() checked = new EventEmitter();

  constructor() { }

  favorite = new FormControl(false);

  ngOnInit(): void {
    this.favorite.setValue(this.rowData.favorite);
  }

  checkedInput(): void {
    console.log(this.favorite.value);
    this.checked.emit({
      id: this.rowId,
      value: this.favorite.value
    });
  }
}
