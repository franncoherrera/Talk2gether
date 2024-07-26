import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private readonly location = inject(Location);

  goBack(): void {
    this.location.back();
  }
}
