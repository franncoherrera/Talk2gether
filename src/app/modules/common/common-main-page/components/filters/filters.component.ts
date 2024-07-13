import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { REGISTER_PARAMETERS } from '../../../../../shared/models/parameter.model';
import { FormService } from '../../../../../shared/services/form.service';
import { ParameterService } from '../../../../../shared/services/parameter.service';
import { ModalComponent } from '../../../../shared/bootstrap-modal/bootstrap-modal.component';
import { SelectFormComponent } from '../../../../shared/select-form/select-form.component';
import { InputCheckboxComponent } from '../../../../shared/input-checkbox/input-checkbox.component';
import { MainPageService } from '../../services/main-page.service';
import { UserService } from '../../../../../shared/services/user.service';
import { CurrentUser } from '../../../../../shared/models/currentUser.model';
import { SweetAlertService } from '../../../../../helpers/sweet-alert.service';
import { SWEET_ALERT_ICON } from '../../../../../shared/enums/sweeAlert.enum';
import { InputFormComponent } from '../../../../shared/input-form/input-form.component';
import { INPUT_TYPE } from '../../../../../shared/enums/input-type.enum';
import {
  CUSTOM_AGE_RANGE,
  CUSTOM_ONLY_NUMBER,
} from '../../../../../shared/validators/formValidator';
import { FormErrorComponent } from '../../../../shared/form-error/form-error.component';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';

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
  filterForm: FormGroup;
  readonly INPUT_TYPE = INPUT_TYPE;
  readonly ICON_CLASS = ICON_CLASS;
  parametersList$: Observable<REGISTER_PARAMETERS>;
  learnLanguage$: Observable<string>;
  submitForm: boolean = false;
  constructor(
    private parameterService: ParameterService,
    protected formService: FormService,
    private mainPageService: MainPageService,
    private userService: UserService,
    private sweetAlertService: SweetAlertService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.learnLanguage$ = this.userService.getCurrentUser().pipe(
      map<CurrentUser, number>((user) => user.id),
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
        interest: new FormControl(''),
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
    this.submitForm = true;
    console.log(this.filterForm);
    if (this.filterForm.invalid) return;
    const filterSearch = {
      
    }
    this.mainPageService.searchRoomFiltered();
  }
}
