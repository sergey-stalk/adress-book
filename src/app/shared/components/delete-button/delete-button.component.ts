import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {
  @Input() rowId: string;
  @Output() delete = new EventEmitter();

  deleteRecord(): void {
    this.delete.emit(this.rowId);
  }
}
