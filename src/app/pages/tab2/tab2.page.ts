import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public scans: any;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.storageService
      .getDataFromStorage()
      .then((resp) => (this.scans = resp));
  }

  public sendEmail(): void {
    console.log('enviando correo');
    this.storageService.sendEmail();
  }

  public openRecord(record): void {
    this.storageService.openRecord(record);
  }
}
