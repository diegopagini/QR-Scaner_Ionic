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
  public scans$: Observable<any>;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.scans$ = this.storageService.getDataFromStorage().pipe(pluck('scans'));
    this.scans$.subscribe(console.log);
  }
}
