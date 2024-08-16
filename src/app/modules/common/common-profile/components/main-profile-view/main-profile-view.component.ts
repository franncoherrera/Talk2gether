import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Observable } from 'rxjs';
import { PROFILE_USER } from '../../../../../shared/models/profileUser.model';

@Component({
  selector: 'fhv-main-profile-view',
  templateUrl: './main-profile-view.component.html',
  styleUrl: './main-profile-view.component.scss',
})
export class MainProfileViewComponent implements OnInit {
  private readonly profileService: ProfileService = inject(ProfileService);
  userProfileData$: Observable<PROFILE_USER>;
  ngOnInit(): void {

    this.userProfileData$ = this.profileService.getProfileData();
  }

}
