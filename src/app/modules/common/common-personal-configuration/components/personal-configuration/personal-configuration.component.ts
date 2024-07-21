import { Component, inject, OnInit } from '@angular/core';
import { PersonalConfigurationService } from '../../services/personal-configuration.service';
import { UserService } from '../../../../../shared/services/user.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'fhv-personal-configuration',
  templateUrl: './personal-configuration.component.html',
  styleUrl: './personal-configuration.component.scss',
})
export class PersonalConfigurationComponent implements OnInit {
  showPersonalData: boolean = true;

  private personalConfigurationService: PersonalConfigurationService = inject(
    PersonalConfigurationService
  );
  private userService: UserService = inject(UserService);

  ngOnInit() {
    this.userService
      .getIdUser()
      .pipe(
        switchMap((userId) =>
          this.personalConfigurationService.getPersonalData(userId)
        )
      ).subscribe(console.log);
  }
}
