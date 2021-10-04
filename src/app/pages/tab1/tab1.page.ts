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
          format: 'geo',
          text: 'geo:40.73151796986687,-74.06087294062502',
        };
        this.storageService.keepInStorage(barcodeData);
        this.storageService.saveRecord(barcodeData.format, barcodeData.text);
      });
  }
}
