import { inject, Injectable } from '@angular/core';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { PAGE_TOUR } from '../constants/playTourSteps';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class PlayTourService {
  private readonly translateService: TranslateService =
    inject(TranslateService);

  startTour(route: string): void {
    const driverObj = driver({
      showProgress: true,
      nextBtnText: this.translateService.instant('common.tour.tour_button_next'),
      prevBtnText: this.translateService.instant('common.tour.tour_button_back'),
      doneBtnText: this.translateService.instant('common.tour.tour_button_done'),
      showButtons: ['next', 'previous', 'close'],
      popoverClass: 'driverjs-theme',
    });

    driverObj.setSteps(this.getTourSteps(route));
    driverObj.drive();
  }

  getTourSteps(route: string) {
    return PAGE_TOUR[route].map((step) => ({
      ...step,
      popover: {
        ...step.popover,
        title: this.translateService.instant(step.popover.title),
        description: this.translateService.instant(step.popover.description),
      },
    }));
  }
}
