import { Alert } from './../../../shared/interfaces';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {
  public alert$ = new Subject<Alert>();

  success(text: string): void {
    this.alert$.next({ type: 'success', text });
  }

  warning(text: string): void {
    this.alert$.next({ type: 'warning', text });
  }

  danger(text: string): void {
    this.alert$.next({ type: 'danger', text });
  }
}
