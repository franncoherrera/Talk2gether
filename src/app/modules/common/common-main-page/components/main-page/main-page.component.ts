import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  catchError,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import { CUSTOM_MODAL_CONFIG } from '../../../../../shared/constants/customModalRefConfig';
import { INPUT_TYPE } from '../../../../../shared/enums/input-type.enum';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';
import { ROOM_USER } from '../../../../../shared/models/roomUser.model';
import { CustomModalService } from '../../../../../shared/services/custom-modal.service';
import { FormService } from '../../../../../shared/services/form.service';
import { UserService } from '../../../../../shared/services/user.service';
import { SpinnerGeneralService } from '../../../../shared/spinner-general/spinner-general.service';
import { MainPageService } from '../../services/main-page.service';
import { FiltersComponent } from '../filters/filters.component';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fhv-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MainPageComponent implements OnInit {
  readonly ICON_CLASS = ICON_CLASS;
  readonly INPUT_TYPE = INPUT_TYPE;
  private unsubscribe$: Subject<void> = new Subject<void>();
  userRoom$: Observable<ROOM_USER[]>;
  isClassicVersion: boolean = true;
  searchForm: FormGroup;

  constructor(
    protected mainPageService: MainPageService,
    private userService: UserService,
    protected formService: FormService,
    private spinnerGeneralService: SpinnerGeneralService,
    private sweetAlertService: SweetAlertService,
    private translateService: TranslateService,
    private customModalService: CustomModalService
  ) {}

  ngOnInit() {
    this.setCardVersion();
    this.searchForm = new FormGroup(
      {
        search: new FormControl(''),
      },
      {
        updateOn: 'change',
      }
    );
    this.searchUserRoom();
  }

  searchUserRoom(): void {
    this.userRoom$ = this.userService.getIdUser().pipe(
      switchMap<number, Observable<ROOM_USER[]>>((userId) =>
        this.mainPageService.searchRoom(userId)
      ),
      catchError(() => {
        this.sweetAlertService.alertMessage(
          this.translateService.instant('common.error.general_error_title'),
          this.translateService.instant(
            'common.error.general_error_description'
          ),
          SWEET_ALERT_ICON.ERROR
        );
        return of([]);
      })
    );
  }

  setCardVersion(): void {
    if (
      localStorage.getItem('cardVersion') !== 'classicVersion' &&
      !!localStorage.getItem('cardVersion')
    ) {
      this.isClassicVersion = false;
    } else {
      localStorage.setItem('cardVersion', 'classicVersion');
    }
  }

  changeCardVersion(): void {
    if (this.isClassicVersion) {
      localStorage.setItem('cardVersion', 'modernVersion');
    } else {
      localStorage.setItem('cardVersion', 'classicVersion');
    }
    this.isClassicVersion = !this.isClassicVersion;
  }

  searchUsers(): void {
    this.searchUserRoom();
    // this.spinnerGeneralService.showSpinner();
    // if (!!this.searchForm.get('search').value) {
    //   this.spinnerGeneralService.hideSpinner();
    //   this.userRoom$ = this.mainPageService
    //     .searchRoomByText(this.searchForm.get('search').value)
    //     .pipe(
    //       catchError(() => {
    //         this.sweetAlertService.alertMessage(
    //           this.translateService.instant('common.error.general_error_title'),
    //           this.translateService.instant(
    //             'common.error.general_error_description'
    //           ),
    //           SWEET_ALERT_ICON.ERROR
    //         );
    //         return of([]);
    //       })
    //     );
    // } else {
    //   this.spinnerGeneralService.hideSpinner();
    //   this.searchUserRoom();
    //   return;
    // }
  }

  openFilters(): void {
    const modalRef: NgbModalRef = this.customModalService.open(
      FiltersComponent,
      CUSTOM_MODAL_CONFIG
    );
    // modalRef.componentInstance.dismissed
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((searchRoom: ROOM_USER[]) => {
    //     this.userRoom$ = of(searchRoom);
    //   });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
