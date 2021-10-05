import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Record } from '../models/record.model';
import { keepInStorage } from '../store/actions/storage.actions';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public records: Record[] = [];
  private _storage: Storage | null = null;

  // eslint-disable-next-line ngrx/no-typed-global-store
  constructor(
    private store: Store<{ storage: any }>,
    private storage: Storage,
    private navController: NavController,
    private iab: InAppBrowser
  ) {
    this.init();
    this.loadStorage();
  }

  // NgRx
  public keepInStorage(payload: any) {
    const { format, text } = payload;
    const newRecord = new Record(format, text);
    // eslint-disable-next-line ngrx/prefer-action-creator-in-dispatch
    this.store.dispatch(keepInStorage({ payload: newRecord }));
  }

  // Ionic Storage
  public async saveRecord(format: string, text: string) {
    await this.loadStorage();
    const newRecord = new Record(format, text);
    this.records.unshift(newRecord);
    this._storage.set('records', this.records);
    this.openRecord(newRecord);
  }

  public getDataFromStorage(): Observable<any> {
    // eslint-disable-next-line ngrx/use-selector-in-select
    return this.store.select('storage');
  }

  private async loadStorage() {
    this.records = (await this.storage.get('records')) || [];
  }

  private async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public openRecord(record: Record) {
    this.navController.navigateForward('/tabs/tab2');
    switch (record.type) {
      case 'http':
        this.iab.create(record.text, '_system');
        break;

      case 'geo':
        this.navController.navigateForward(`/tabs/tab2/map/${record.text}`);
        break;

      default:
        break;
    }
  }
}
