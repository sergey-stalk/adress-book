import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { pluck, takeUntil } from 'rxjs/operators';
import { ICheckedEvent, IRowData } from '../../entities/models/main-model.interfaces';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, OnDestroy {
    constructor(private httpService: HttpService) {
    }

    tableData: IRowData[];

    private readonly componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    ngOnInit(): void {
        this.listenOnDataLoaded();
        this.listenOnDataChanged();
    }

    ngOnDestroy(): void {
        this.componentDestroyed$.next(true);
    }

    sortFavorite(data): void {
      this.tableData = data.sort((item) => item.favorite ? -1 : 1);
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

    private listenOnDataLoaded(): void {
        this.httpService.getTableData()
            .pipe(
                pluck('data')
            ).subscribe(this.sortFavorite.bind(this));
    }

    private listenOnDataChanged(): void {
        this.httpService.dataUpdated
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe(this.sortFavorite.bind(this));
    }

}
