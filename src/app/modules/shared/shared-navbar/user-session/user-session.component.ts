import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { SesionService } from '../../../../shared/interceptors/sesion.service';
import { UserService } from '../../../../shared/services/user.service';
import { BreakPointService } from '../../../../shared/services/break-point.service';
import { CurrentUser } from '../../../../shared/models/currentUser.model';
import { Observable } from 'rxjs';
import { ICON_CLASS } from '../../../../../../public/assets/icons_class/icon_class';
import { ROUTES_PATH } from '../../../../shared/constants/routes';

@Component({
  selector: 'fhv-user-session',
  templateUrl: './user-session.component.html',
  styleUrl: './user-session.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UserSessionComponent implements OnInit {
  currentUser$: Observable<CurrentUser>;
  @Output() closeNavbar: EventEmitter<void> = new EventEmitter();
  readonly ICON_CLASS = ICON_CLASS;
  readonly ROUTES_PATH = ROUTES_PATH;

  constructor(
    protected sesionService: SesionService,
    private userService: UserService,
    protected breakPointService: BreakPointService
  ) {}

  ngOnInit(): void {
    if (this.sesionService.isLoggedIn()) {
      this.currentUser$ = this.userService.getCurrentUser();
    }
  }

  closeNavbarChild(): void {
    this.closeNavbar.emit();
  }
  
}
