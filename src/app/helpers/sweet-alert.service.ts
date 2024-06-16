import { Injectable } from '@angular/core';
import Swal, {
  SweetAlertIcon,
  SweetAlertPosition,
} from 'sweetalert2';

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

  errorAlert(message: string, title: string, icon: SweetAlertIcon): void {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
      confirmButtonColor: this.confirmButtonColor,
    });
  }

  errorAlertTimer(
    message: string,
    time: number,
    position: SweetAlertPosition,
    icon: SweetAlertIcon
  ): void {
    Swal.fire({
      position: position,
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: time,
    });
  }

  errorAlertMessage(title: string, icon: SweetAlertIcon): void {
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
}
