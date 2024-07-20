import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import {
  catchError,
  filter,
  Observable,
  of,
  switchMap
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

  private readonly destroy: DestroyRef = inject(DestroyRef);
  protected mainPageService: MainPageService = inject(MainPageService);
  private userService: UserService = inject(UserService);
  protected formService: FormService = inject(FormService);
  private spinnerGeneralService: SpinnerGeneralService = inject(
    SpinnerGeneralService
  );
  private sweetAlertService: SweetAlertService = inject(SweetAlertService);
  private translateService: TranslateService = inject(TranslateService);
  private customModalService: CustomModalService = inject(CustomModalService);

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
      filter(Boolean),
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
    this.spinnerGeneralService.showSpinner();
    if (!!this.searchForm.get('search').value) {
      this.spinnerGeneralService.hideSpinner();
      this.userRoom$ = this.mainPageService
        .searchRoomByText(this.searchForm.get('search').value)
        .pipe(
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
    } else {
      this.spinnerGeneralService.hideSpinner();
      this.searchUserRoom();
      return;
    }
  }

  openFilters(): void {
    const modalRef: NgbModalRef = this.customModalService.open(
      FiltersComponent,
      CUSTOM_MODAL_CONFIG
    );
    modalRef.componentInstance.dismissed
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe((searchRoom: ROOM_USER[]) => {
        this.userRoom$ = of(searchRoom);
      });
  }
}
