import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../core/http.service';
import {map} from 'rxjs/operators';
import {ICheckedEvent, IRowData, ITableData} from '../../entities/models/main-model.model';
import {untilDestroyed} from '@ngneat/until-destroy';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  constructor(private httpService: HttpService) { }

  tableData: any;

  ngOnInit(): void {
    this.httpService.getTableData()
      .pipe(
        map(dataObj => dataObj.data),
      ).subscribe((data: ITableData) => {
        this.tableData = this.sortFavorite(data);
      });

    this.httpService.dataUpdated.subscribe((data: ITableData) => {
        this.tableData = this.sortFavorite(data);
      });
  }

  sortFavorite(data: ITableData): ITableData {
    data.sort((item) => item.favorite ? -1 : 1);
    return data;
  }

  deleteRecord(id: string): void {
    this.tableData = this.tableData.filter((item: IRowData, index: number) => {
      return index !== Number(id);
    });
    this.httpService.putData(this.tableData);
  }

  checkedInput(valueArr: ICheckedEvent): void {
    this.tableData[valueArr.id].favorite = !valueArr.value;
    this.httpService.putData(this.tableData);
  }

}
