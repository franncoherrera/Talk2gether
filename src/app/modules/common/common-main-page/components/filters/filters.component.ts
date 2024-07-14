import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import { INPUT_TYPE } from '../../../../../shared/enums/input-type.enum';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';
import { REGISTER_PARAMETERS } from '../../../../../shared/models/parameter.model';
import { CustomModalService } from '../../../../../shared/services/custom-modal.service';
import { FormService } from '../../../../../shared/services/form.service';
import { ParameterService } from '../../../../../shared/services/parameter.service';
import { UserService } from '../../../../../shared/services/user.service';
import {
  CUSTOM_AGE_RANGE,
  CUSTOM_ONLY_NUMBER,
} from '../../../../../shared/validators/formValidator';
import { ModalComponent } from '../../../../shared/bootstrap-modal/bootstrap-modal.component';
import { FormErrorComponent } from '../../../../shared/form-error/form-error.component';
import { InputCheckboxComponent } from '../../../../shared/input-checkbox/input-checkbox.component';
import { InputFormComponent } from '../../../../shared/input-form/input-form.component';
import { SelectFormComponent } from '../../../../shared/select-form/select-form.component';
import { MainPageService } from '../../services/main-page.service';

@Component({
  selector: 'fhv-filters',
  imports: [
    CommonModule,
    ModalComponent,
    SelectFormComponent,
    TranslateModule,
    ReactiveFormsModule,
    InputCheckboxComponent,
    InputFormComponent,
    FormErrorComponent,
  ],
  standalone: true,
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent implements OnInit {
  readonly INPUT_TYPE = INPUT_TYPE;
  readonly ICON_CLASS = ICON_CLASS;
  filterForm: FormGroup;
  private unsubscribe$: Subject<void> = new Subject<void>();
  parametersList$: Observable<REGISTER_PARAMETERS>;
  learnLanguage$: Observable<string>;
  submitForm: boolean = false;
  @Output() dismissed = new EventEmitter<any>();

  constructor(
    private parameterService: ParameterService,
    protected formService: FormService,
    private mainPageService: MainPageService,
    private userService: UserService,
    private sweetAlertService: SweetAlertService,
    private translateService: TranslateService,
    private modalService: CustomModalService
  ) {}

  ngOnInit() {
    this.learnLanguage$ = this.userService.getIdUser().pipe(
      switchMap<number, Observable<string>>((userId) =>
        this.mainPageService.getLearnLanguage(userId)
      ),
      catchError(() => {
        this.sweetAlertService.alertMessage(
          this.translateService.instant('common.error.general_error_title'),
          this.translateService.instant(
            'common.error.general_error_description'
          ),
          SWEET_ALERT_ICON.ERROR
        );
        return of('');
      })
    );

    this.parametersList$ = combineLatest([
      this.parameterService.getActiveCountries(),
      this.parameterService.getActiveLanguageLevel(),
      this.parameterService.getActiveInterests(),
    ]).pipe(
      map(([countryList, languageLevelList, interestList]) => {
        return {
          countryList: countryList,
          languageLevelList: languageLevelList,
          interestList: interestList,
        };
      })
    );
    this.filterForm = new FormGroup(
      {
        country: new FormControl(''),
        level: new FormControl(''),
        interest: new FormControl([]),
        minAge: new FormControl(null, CUSTOM_ONLY_NUMBER),
        maxAge: new FormControl(null, CUSTOM_ONLY_NUMBER),
      },
      {
        updateOn: 'change',
        validators: CUSTOM_AGE_RANGE,
      }
    );
  }

  searchFilters(): void {
    let idUser: number;
    this.userService
      .getIdUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (IdUser) => (idUser = IdUser),
      });
    this.submitForm = true;
    if (this.filterForm.invalid) return;
    const filterSearch = {
      idUser: idUser,
      minAge: this.filterForm.get('minAge')?.value ?? '',
      maxAge: this.filterForm.get('maxAge')?.value ?? '',
      country:
        this.formService.removeSpaces(this.filterForm.get('country')?.value) ??
        '',
      levelLanguage:
        this.formService.removeSpaces(
          this.filterForm.get('levelLanguage')?.value
        ) ?? '',
      interest: this.filterForm.get('interest')?.value.join(',') ?? '',
    };
    this.mainPageService
      .searchRoomFiltered(filterSearch)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (searchRoom) => {
          this.dismissed.emit(searchRoom);
          this.modalService.dismissActiveModal();
        },
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
