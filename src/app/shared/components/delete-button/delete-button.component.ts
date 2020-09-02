import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnInit {
  @Input() rowId: string;
  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  deleteRecord(): void {
    this.delete.emit(this.rowId);
  }
}
