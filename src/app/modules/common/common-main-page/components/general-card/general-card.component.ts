import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { ROOM_USER } from '../../../../../shared/models/roomUser.model';
import { PAGINATION } from '../../../../../shared/constants/paginationConstants';
import { MainPageService } from '../../services/main-page.service';
import { Router } from '@angular/router';
import { ROUTES_PATH } from '../../../../../shared/constants/routes';

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

  protected goVideoCall(urlPhoto: string): void {
    
    this.mainPageService.saveUrlPhoto(urlPhoto);
    this.router.navigate([ROUTES_PATH.VIDEO_CALL_PAGE]);
  }
}
