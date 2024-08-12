import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerGeneralService {
  spinnerState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  protected router: Router = inject(Router);

  showSpinner(): void {
    this.spinnerState.next(true);
  }

  hideSpinner(): void {
    this.spinnerState.next(false);
  }

  getSpinnerState(): Observable<boolean> {
    return this.spinnerState.asObservable();
  }
}
