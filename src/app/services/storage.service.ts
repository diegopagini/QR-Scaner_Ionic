import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Store } from '@ngrx/store';
import { File } from '@ionic-native/file/ngx';
import { Record } from '../models/record.model';
import { keepInStorage } from '../store/actions/storage.actions';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public records: Record[] = [];
  private _storage: Storage | null = null;
  private fileName: string = 'records.csv';

  // eslint-disable-next-line ngrx/no-typed-global-store
  constructor(
    private store: Store<{ storage: any }>,
    private storage: Storage,
    private navController: NavController,
    private iab: InAppBrowser,
    private file: File,
    private emailComposer: EmailComposer
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

  public async getDataFromStorage() {
    // eslint-disable-next-line ngrx/use-selector-in-select
    // return this.store.select('storage');

    const record = await this.storage.get('records');
    this.records = record || [];
    return this.records;
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

  public sendEmail() {
    const temp: any[] = [];
    const titles: string = 'Type, Format, Created, Text\n';

    temp.push(titles);
    this.records.forEach((record) => {
      const line = `${record.type}, ${record.format}, ${
        record.created
      }, ${record.text.replace(',', ' ')}\n`;

      temp.push(line);
      this.createFile(temp.join(''));
    });
  }

  private createFile(text: string) {
    this.file
      .checkFile(this.file.dataDirectory, this.fileName)
      .then((exists) => {
        return this.writeInFile(text);
      })
      .catch((err) => {
        return this.file
          .createFile(this.file.dataDirectory, this.fileName, false)
          .then((created) => {
            this.writeInFile(text);
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }

  private async writeInFile(text: string) {
    await this.file.writeExistingFile(
      this.file.dataDirectory,
      this.fileName,
      text
    );

    const file = `${this.file.dataDirectory}${this.fileName}`;
    const email = {
      to: '',
      // cc: '',
      // bcc: ['', ''],
      attachments: [file],
      subject: 'Backup scans',
      body: 'Backups scans - <strong>QRSanner</strong>',
      isHtml: true,
    };

    // Send a text message using default options
    this.emailComposer.open(email);
  }
}
