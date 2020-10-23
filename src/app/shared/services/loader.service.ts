import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isloading: boolean;
  loadingStatus: Subject<any> = new Subject();

  constructor() {
    this.isloading = false;
  }

  get loading(): boolean {
    return this.isloading;
  }

  set loading(value) {
    this.isloading = value;
    this.loadingStatus.next(value);
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }
}
