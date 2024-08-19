import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { ROUTES_PATH } from '../../../../../shared/constants/routes';
import { PROFILE_USER } from '../../../../../shared/models/profileUser.model';
import { FormService } from '../../../../../shared/services/form.service';
import { UserService } from '../../../../../shared/services/user.service';
import { MainPageService } from '../../../common-main-page/services/main-page.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'fhv-main-profile-view',
  templateUrl: './main-profile-view.component.html',
  styleUrl: './main-profile-view.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MainProfileViewComponent implements OnInit {
  isShownMyProfile: boolean = false;
  userProfileData: PROFILE_USER;
  idUserProfile: number;
  readonly ICON_CLASS = ICON_CLASS;

  private readonly profileService: ProfileService = inject(ProfileService);
  protected readonly formService: FormService = inject(FormService);
  private readonly userService: UserService = inject(UserService);
  private readonly destroy: DestroyRef = inject(DestroyRef);
  private readonly router: Router = inject(Router);
  protected readonly mainPageService: MainPageService = inject(MainPageService);

  ngOnInit(): void {
    combineLatest([
      this.profileService.getIdUserProfile(),
      this.userService.getIdUser(),
    ])
      .pipe(
        takeUntilDestroyed(this.destroy),
        map(([idUserProfile, idUser]: [number, number]) => {
          const storedProfileUser = localStorage.getItem('profile');
          const profileUser =
            idUserProfile ||
            (storedProfileUser ? Number(storedProfileUser) : idUser);
          this.idUserProfile = profileUser;
          return [profileUser, idUser];
        }),
        switchMap(([idUserProfile, idUser]: [number, number]) => {
          if (idUserProfile === idUser) {
            this.isShownMyProfile = true;
            return this.profileService.getProfileData(idUserProfile);
          }
          return of([idUserProfile, idUser]);
        }),
        switchMap((profileUser: PROFILE_USER | [number, number]) => {
          if (Array.isArray(profileUser)) {
            return this.validateBloquedUser(profileUser[0], profileUser[1]);
          }
          return of(profileUser);
        })
      )
      .subscribe({
        next: (userProfileData: PROFILE_USER) => {
          this.userProfileData = userProfileData;
        },
      });
  }

  validateBloquedUser(
    idBlockUser: number,
    idBlockedUser: number
  ): Observable<PROFILE_USER | null> {
    return combineLatest([
      this.profileService.checkBloquedUsers(idBlockUser, idBlockedUser),
      this.profileService.checkBloquedUsers(idBlockedUser, idBlockUser),
    ]).pipe(
      switchMap(([blockByMe, blockByOtherUser]) => {
        const statusByMe: boolean = blockByMe.estado;
        const statusByOther: boolean = blockByOtherUser.estado;
        if (statusByMe) {
          //ACCION 1
          return of(null);
        } else if (statusByOther) {
          //ACCION 2
          return of(null);
        } else {
          return this.profileService.getProfileData(idBlockUser);
        }
      })
    );
  }

  goChatMessages() {
    this.mainPageService.saveUserIdChat(this.idUserProfile.toString());
    this.router.navigate([ROUTES_PATH.CHAT_MESSAGES]);
  }
}
