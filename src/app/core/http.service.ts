import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import { IRowData } from '../shared/entities/models/main-model.interfaces';
import { HttpConfig } from '../shared/entities/constants/http.config';
import {ITableData} from '../shared/entities/models/main-model.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  dataUpdated: Subject<IRowData[]> = new Subject<IRowData[]>();

  getTableData(): Observable<any> {
    return of({data: JSON.parse(localStorage.getItem('data'))});
    /*return this.http.get(HttpConfig.ApiUrl, {
      headers: {'secret-key': HttpConfig.SecretKey}
    });*/
  }

  putData(data: IRowData[]): void {
    localStorage.setItem('data', JSON.stringify(data));
    this.dataUpdated.next(data);
    /*this.http.put(HttpConfig.ApiUrl, JSON.stringify({ data }), {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'secret-key': HttpConfig.SecretKey
      }
    }).subscribe(() => this.dataUpdated.next(data));*/
  }
}
