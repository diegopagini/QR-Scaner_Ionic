import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public slideOptions = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  constructor(
    private barcodeScanner: BarcodeScanner,
    private storageService: StorageService
  ) {}

  public scan() {
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        if (!barcodeData.cancelled) {
          // ngrx
          this.storageService.keepInStorage(barcodeData);
          // ionStorage
          this.storageService.saveRecord(barcodeData.format, barcodeData.text);
        }
      })
      .catch((err) => {
        // Only to test ngrx
        const barcodeData = {
          format: 'QRCode',
          text: 'https://www.youtube.com/',
        };
        this.storageService.keepInStorage(barcodeData);
        this.storageService.saveRecord(barcodeData.format, barcodeData.text);
      });
  }
}
