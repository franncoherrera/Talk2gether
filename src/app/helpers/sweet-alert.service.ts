import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import { SWEET_ALERT_POSITION } from '../shared/enums/sweeAlert.enum';
import { ALERT_OPTIONS } from './sweet-alert.interface';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  /**
   * The confirmation button color for alerts.
   */
  private readonly confirmButtonColor: string = '#2b6a78';

  /**
   * CSS class to show the SweetAlert pop-up.
   */
  private readonly showClassPopUp: string =
    'animate__animated animate__fadeInDown';

  /**
   * CSS class to hide the SweetAlert pop-up.
   */
  private readonly hideClassPopUp: string =
    'animate__animated animate__fadeOutUp';

  /**
   * Displays an alert message using SweetAlert.
   *
   * @param message - The message to display in the alert.
   * @param title - The title of the alert.
   * @param icon - The icon to display in the alert, indicating the type of message (e.g., success, error, warning).
   * @remarks
   * This method uses SweetAlert to create a customizable alert pop-up with the provided message, title, and icon.
   * The confirmation button color is set using the predefined `confirmButtonColor`.
   */
  alertMessage(message: string, title: string, icon: SweetAlertIcon): void {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
      confirmButtonColor: this.confirmButtonColor,
    });
  }

  /**
   * Displays a timed alert message using SweetAlert.
   *
   * @deprecated This method is deprecated because the generated modal is not responsive. Consider using an alternative method for responsive modals.
   *
   * @param message - The message to display in the alert.
   * @param position - The position of the alert on the screen.
   * @param icon - The icon to display in the alert, indicating the type of message (e.g., success, error, warning).
   * @param time - The duration (in milliseconds) for which the alert should be displayed. Defaults to 2000ms.
   */
  alertTimer(
    message: string,
    position: SweetAlertPosition,
    icon: SweetAlertIcon,
    time: number = 2000
  ): void {
    Swal.fire({
      position: position,
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: time,
    });
  }

  /**
   * Displays a confirmation alert message using SweetAlert.
   *
   * @param title - The title of the alert.
   * @param icon - The icon to display in the alert, indicating the type of message (e.g., success, error, warning).
   *
   */
  alertMessageConfirm(title: string, icon: SweetAlertIcon): void {
    Swal.fire({
      title: title,
      showClass: {
        popup: this.showClassPopUp,
      },
      hideClass: {
        popup: this.hideClassPopUp,
      },
      icon: icon,
      confirmButtonColor: this.confirmButtonColor,
    });
  }

  /**
   * Displays an impromptu alert message as a toast using SweetAlert.
   *
   * @param toast - Determines whether the alert is displayed as a toast notification. Defaults to `true`.
   * @param position - The position of the toast on the screen. Defaults to `SWEET_ALERT_POSITION.TOP_RIGHT`.
   * @param showConfirmButton - Determines whether to show the confirm button. Defaults to `false`.
   * @param timer - The duration (in milliseconds) for which the toast should be displayed. Defaults to 3000ms.
   * @param timerProgressBar - Determines whether to show a progress bar with the timer. Defaults to `true`.
   * @param title - The title of the toast.
   * @param icon - The icon to display in the toast, indicating the type of message (e.g., success, error, warning).
   */
  alertImpromptu({
    toast = true,
    position = SWEET_ALERT_POSITION.TOP_RIGHT,
    showConfirmButton = false,
    timer = 3000,
    timerProgressBar = true,
    title,
    icon,
  }: ALERT_OPTIONS): void {
    const Toast = Swal.mixin({
      toast: toast,
      position: position,
      showConfirmButton: showConfirmButton,
      timer: timer,
      timerProgressBar: timerProgressBar,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: icon,
      title: title,
    });
  }
}
