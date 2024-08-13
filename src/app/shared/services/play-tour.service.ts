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

  /**
   * Starts a tour guided by Driver.js for a specific route.
   *
   * This method initializes a new Driver.js instance with customized options such as progress indicator,
   * button texts, and popover styles. It sets the steps for the tour based on the provided route and
   * then starts the tour.
   *
   * @param route - The route for which the tour should be started. The route determines which steps to show
   * based on the `PAGE_TOUR` configuration.
   */
  startTour(route: string): void {
    const driverObj = driver({
      showProgress: true,
      nextBtnText: this.translateService.instant(
        'common.tour.tour_button_next'
      ),
      prevBtnText: this.translateService.instant(
        'common.tour.tour_button_back'
      ),
      doneBtnText: this.translateService.instant(
        'common.tour.tour_button_done'
      ),
      showButtons: ['next', 'previous', 'close'],
      popoverClass: 'driverjs-theme',
    });

    driverObj.setSteps(this.getTourSteps(route));
    driverObj.drive();
  }

  /**
   * Retrieves the steps for the tour based on the provided route.
   *
   * This method fetches the tour steps for the given route from the `PAGE_TOUR` configuration, and
   * translates the titles and descriptions of the popovers into the current language.
   *
   * @param route - The route for which the tour steps should be retrieved. The route determines which steps
   * to include based on the `PAGE_TOUR` configuration.
   * @returns An array of tour steps with translated titles and descriptions.
   */
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
