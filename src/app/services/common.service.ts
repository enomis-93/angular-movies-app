import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}
  private data = new BehaviorSubject('');
  data$ = this.data.asObservable();

  changeData(data: string) {
    this.data.next(data);
  }
}
