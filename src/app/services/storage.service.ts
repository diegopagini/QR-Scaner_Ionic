import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Record } from '../models/record.model';
import { keepInStorage } from '../store/actions/storage.actions';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public records: Record[] = [];
  // eslint-disable-next-line ngrx/no-typed-global-store
  constructor(
    private store: Store<{ storage: any }>,
    private http: HttpClient
  ) {}

  // NgRx
  public keepInStorage(payload: any) {
    const { format, text } = payload;
    const newRecord = new Record(format, text);
    // eslint-disable-next-line ngrx/prefer-action-creator-in-dispatch
    this.store.dispatch(keepInStorage({ payload: newRecord }));
  }

  // Ionic Storage
  public saveRecord(format: string, text: string) {
    const newRecord = new Record(format, text);
    this.records.unshift(newRecord);
  }

  public getDataFromStorage(): Observable<any> {
    // eslint-disable-next-line ngrx/use-selector-in-select
    return this.store.select('storage');
  }
}
