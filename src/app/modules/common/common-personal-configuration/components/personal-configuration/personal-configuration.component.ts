import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { PersonalConfigurationService } from '../../services/personal-configuration.service';
import { UserService } from '../../../../../shared/services/user.service';
import { Observable, switchMap } from 'rxjs';
import { CONFIG_USER } from '../../../../../shared/models/configUser.model';

@Component({
  selector: 'fhv-personal-configuration',
  templateUrl: './personal-configuration.component.html',
  styleUrl: './personal-configuration.component.scss',
})
export class PersonalConfigurationComponent implements OnInit {
  showPersonalData: WritableSignal<boolean> = signal(true);
  personalData$: Observable<CONFIG_USER>;

  private personalConfigurationService: PersonalConfigurationService = inject(
    PersonalConfigurationService
  );
  private userService: UserService = inject(UserService);

  ngOnInit() {
    this.personalData$ = this.userService
      .getIdUser()
      .pipe(
        switchMap((userId) =>
          this.personalConfigurationService.getPersonalData(userId)
        )
      );
  }

  changePersonalData(event: boolean) {
    this.showPersonalData.set(event);
  }
}
