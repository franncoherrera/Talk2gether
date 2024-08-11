import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import { SWEET_ALERT_POSITION } from '../shared/enums/sweeAlert.enum';
import { ALERT_OPTIONS } from './sweet-alert.interface';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  /* Custon color --> var(--color-primary) in styles.scss*/
  private readonly confirmButtonColor: string = '#2b6a78';
  /* Sweet alert classes */
  private readonly showClassPopUp: string =
    'animate__animated animate__fadeInDown';
  private readonly hideClassPopUp: string =
    'animate__animated animate__fadeOutUp';

  alertMessage(message: string, title: string, icon: SweetAlertIcon): void {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
      confirmButtonColor: this.confirmButtonColor,
    });
  }
  /* Deprecated method: this one is not responsive modal*/
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
