import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MainPageService } from '../../services/main-page.service';
import { UserService } from '../../../../../shared/services/user.service';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { ROOM_USER } from '../../../../../shared/models/roomUser.model';
import { CurrentUser } from '../../../../../shared/models/currentUser.model';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { FormControl, FormGroup } from '@angular/forms';
import { FormService } from '../../../../../shared/services/form.service';
import { INPUT_TYPE } from '../../../../../shared/enums/input-type.enum';
import { SpinnerGeneralService } from '../../../../shared/spinner-general/spinner-general.service';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import { TranslateService } from '@ngx-translate/core';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';

@Component({
  selector: 'fhv-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MainPageComponent implements OnInit {
  readonly ICON_CLASS = ICON_CLASS;
  readonly INPUT_TYPE = INPUT_TYPE;
  userRoom$: Observable<ROOM_USER[]>;
  isClassicVersion: boolean = true;
  searchForm: FormGroup;

  constructor(
    private mainPageService: MainPageService,
    private userService: UserService,
    protected formService: FormService,
    private spinnerGeneralService: SpinnerGeneralService,
    private sweetAlertService: SweetAlertService,
    private translateService: TranslateService
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
    this.userRoom$ = this.userService.getCurrentUser().pipe(
      map<CurrentUser, number>((user) => user.id),
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
}
