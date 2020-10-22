import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy  {

  loading: boolean;
  loadingSubscription: Subscription;

  constructor(private loadingScreenService: LoaderService) {
    this.loading = false;
  }

  ngOnInit() {
    this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe((value) => {
      this.loading = value;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
