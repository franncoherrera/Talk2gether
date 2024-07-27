import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { ROOM_USER } from '../../../../../shared/models/roomUser.model';
import { PAGINATION } from '../../../../../shared/constants/paginationConstants';
import { MainPageService } from '../../services/main-page.service';
import { Router } from '@angular/router';
import { ROUTES_PATH } from '../../../../../shared/constants/routes';
import Swal from 'sweetalert2';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'fhv-general-card',
  templateUrl: './general-card.component.html',
  styleUrl: './general-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class GeneralCardComponent {
  readonly PAGINATION = PAGINATION;
  page: number;
  userRoom = input<ROOM_USER[]>();
  isClassicVersion = input<boolean>();

  protected mainPageService: MainPageService = inject(MainPageService);
  protected router: Router = inject(Router);
  protected translateService: TranslateService = inject(TranslateService);

  protected goVideoCall(urlPhoto: string): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ms-5',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: this.translateService.instant(
          'common.video_call_page.video_call_modal_title'
        ),
        text: this.translateService.instant(
          'common.video_call_page.video_call_modal_subtitle'
        ),
        icon: SWEET_ALERT_ICON.WARNING,
        showCancelButton: true,
        confirmButtonText: this.translateService.instant(
          'common.video_call_page.video_call_modal_button_continue'
        ),
        cancelButtonText: this.translateService.instant(
          'common.video_call_page.video_call_modal_button_back'
        ),
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.mainPageService.saveUrlPhoto(urlPhoto);
          this.router.navigate([ROUTES_PATH.VIDEO_CALL_PAGE]);
        }
      });
  }
}
