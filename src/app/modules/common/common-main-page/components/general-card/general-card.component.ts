import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { PAGINATION } from '../../../../../shared/constants/paginationConstants';
import { ROUTES_PATH } from '../../../../../shared/constants/routes';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';
import { ROOM_USER } from '../../../../../shared/models/roomUser.model';
import { MainPageService } from '../../services/main-page.service';

@Component({
  selector: 'fhv-general-card',
  templateUrl: './general-card.component.html',
  styleUrl: './general-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class GeneralCardComponent {
  readonly PAGINATION = PAGINATION;
  readonly ICON_CLASS = ICON_CLASS;
  page: number;
  userRoom = input<ROOM_USER[]>();
  isClassicVersion = input<boolean>();

  protected readonly mainPageService: MainPageService = inject(MainPageService);
  protected readonly router: Router = inject(Router);
  protected readonly translateService: TranslateService =
    inject(TranslateService);

  protected goVideoCall(room: ROOM_USER): void {
    if (room.idReunionVirtual === null) return;
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
          this.mainPageService.saveRoom(room);
          this.router.navigate([ROUTES_PATH.VIDEO_CALL_PAGE]);
        }
      });
  }
  chatUserSelected(idUserChatSelected: number): void {
    if (idUserChatSelected === null) return;
    this.mainPageService.saveUserIdChat(idUserChatSelected.toString());
    this.router.navigate([ROUTES_PATH.CHAT_MESSAGES]);
  }
}
