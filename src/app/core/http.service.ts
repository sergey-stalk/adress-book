import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IRowData } from '../shared/entities/models/main-model.interfaces';
import { HttpConfig } from '../shared/entities/constants/http.config';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  dataUpdated: Subject<IRowData[]> = new Subject<IRowData[]>();

  getTableData(): Observable<any> {
    return this.http.get(HttpConfig.ApiUrl, {
      headers: {'secret-key': HttpConfig.SecretKey}
    });
  }

  putData(data: IRowData[]): void {
    this.http.put(HttpConfig.ApiUrl, JSON.stringify({ data }), {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'secret-key': HttpConfig.SecretKey
      }
    }).subscribe(() => this.dataUpdated.next(data));
  }
}
