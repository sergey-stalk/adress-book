import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {IRowData, ITableData} from '../shared/entities/models/main-model.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }
  dataUpdated = new Subject();

  getTableData(): Observable<any> {
    return this.http.get('https://api.jsonbin.io/s/5f4bbbd34d8ce4111383ff59', {
      headers: {'secret-key': '$2b$10$RMDsUvrDylIbv/FMcpEYYexXqmY4FRc2dfUYo/PrKW5HD780QUctK'}
    });
  }

  putData(data: IRowData[]): void {
    this.http.put('https://api.jsonbin.io/s/5f4bbbd34d8ce4111383ff59', JSON.stringify({data}), {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'secret-key': '$2b$10$RMDsUvrDylIbv/FMcpEYYexXqmY4FRc2dfUYo/PrKW5HD780QUctK'
      }
    }).subscribe(() => {
      this.dataUpdated.next(data);
    });
  }
}
