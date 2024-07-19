import { Component, DestroyRef, inject } from '@angular/core';
import { INPUT_TYPE } from '../../../shared/enums/input-type.enum';
import { FormControl, FormGroup } from '@angular/forms';
import { FormService } from '../../../shared/services/form.service';
import { CommonReferralLinkService } from './services/common-referral-link.service';
import { UserService } from '../../../shared/services/user.service';
import { Observable, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fhv-common-referral-link',
  templateUrl: './common-referral-link.component.html',
  styleUrl: './common-referral-link.component.scss',
})
export class CommonReferralLinkComponent {
  readonly INPUT_TYPE = INPUT_TYPE;
  referralLink$: Observable<string>;
  referralLinkForm: FormGroup;

  private readonly destroy: DestroyRef = inject(DestroyRef);
  protected readonly formService = inject(FormService);
  private readonly commonReferralLinkService = inject(
    CommonReferralLinkService
  );
  private readonly userService = inject(UserService);

  ngOnInit() {
    this.referralLinkForm = new FormGroup({
      link: new FormControl(''),
    });

    this.userService
      .getIdUser()
      .pipe(
        takeUntilDestroyed(this.destroy),
        switchMap((idUser) =>
          this.commonReferralLinkService.getReferralLink(idUser)
        ),
        tap((link) => this.changeUrl(link))
      )
      .subscribe();
  }

  changeUrl(link: string): void {
    const baseUrl = window.location.origin;
    const referralCode = link['mensaje'].split('/').pop();
    const referralLink = `${baseUrl}/${referralCode}`;
    this.referralLinkForm.setValue({ link: referralLink });
  }
}
