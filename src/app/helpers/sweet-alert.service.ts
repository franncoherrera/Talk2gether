import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  errorAlert(message: string, title: string, icon: SweetAlertIcon): void {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
      confirmButtonColor: '#2b6a78',
    });
  }

  errorAlertTimer(message: string, time: number): void {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: time,
    });
  }
}
