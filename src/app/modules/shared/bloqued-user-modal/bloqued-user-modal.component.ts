import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { BloquedUserService } from './services/bloqued-user.service';
import { Observable, switchMap } from 'rxjs';
import { ModalComponent } from '../bootstrap-modal/bootstrap-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { BLOQUED_USER } from '../../../shared/models/bloquedUser.model';

@Component({
  selector: 'fhv-bloqued-user-modal',
  standalone: true,
  imports: [CommonModule, ModalComponent, TranslateModule],
  templateUrl: './bloqued-user-modal.component.html',
  styleUrl: './bloqued-user-modal.component.scss',
})
export class BloquedUserModalComponent implements OnInit {
  bloquedUserArray$: Observable<BLOQUED_USER[]>;

  private readonly userService: UserService = inject(UserService);
  private readonly bloquedUserService: BloquedUserService =
    inject(BloquedUserService);

  ngOnInit() {
    this.bloquedUserArray$ = this.userService
      .getIdUser()
      .pipe(
        switchMap((idUser) => this.bloquedUserService.getPersonalData(idUser))
      );
  }
}
