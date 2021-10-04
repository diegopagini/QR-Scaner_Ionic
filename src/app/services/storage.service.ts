import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Record } from '../models/record.model';
import { keepInStorage } from '../store/actions/storage.actions';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public records: Record[] = [];
  constructor(private store: Store) {}

  public keepInStorage(payload: any) {
    const { format, text } = payload;
    const newRecord = new Record(format, text);
    // eslint-disable-next-line ngrx/prefer-action-creator-in-dispatch
    this.store.dispatch(keepInStorage({ payload: newRecord }));
  }

  public saveRecord(format: string, text: string) {
    const newRecord = new Record(format, text);
    this.records.unshift(newRecord);
  }
}
