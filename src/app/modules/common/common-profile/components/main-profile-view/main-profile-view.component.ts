import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { PROFILE_USER } from '../../../../../shared/models/profileUser.model';
import { FormService } from '../../../../../shared/services/form.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'fhv-main-profile-view',
  templateUrl: './main-profile-view.component.html',
  styleUrl: './main-profile-view.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MainProfileViewComponent implements OnInit {
  userProfileData$: Observable<PROFILE_USER>;
  readonly ICON_CLASS = ICON_CLASS;
  private readonly profileService: ProfileService = inject(ProfileService);
  protected readonly formService: FormService = inject(FormService);

  ngOnInit(): void {
    this.userProfileData$ = this.profileService.getProfileData();
  }
}
