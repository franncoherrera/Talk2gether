import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { ICON_CLASS } from '../../../../../../public/assets/icons_class/icon_class';
import { GENERAL_PATH, ROUTES_PATH } from '../../../../shared/constants/routes';
import { LANGUAGE } from '../../../../shared/enums/languages.enum';
import { SesionService } from '../../../../shared/interceptors/sesion.service';
import { BreakPointService } from '../../../../shared/services/break-point.service';

@Component({
  selector: 'fhv-shared-navbar',
  templateUrl: './shared-navbar.component.html',
  styleUrl: './shared-navbar.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SharedNavbarComponent implements OnInit {
  readonly LANGUAGE = LANGUAGE;
  readonly ICON_CLASS = ICON_CLASS;
  readonly ROUTES_PATH = ROUTES_PATH;
  readonly GENERAL_PATH = GENERAL_PATH;
  currentUrl: string;

  @ViewChild('navbarToggler') navbarToggler: ElementRef;
  @ViewChild('thrower') navbarContent: ElementRef;

  protected readonly sesionService: SesionService = inject(SesionService);
  protected readonly breakPointService: BreakPointService =
    inject(BreakPointService);
  private readonly router: Router = inject(Router);
  private readonly destroy: DestroyRef = inject(DestroyRef);

  ngOnInit() {
    this.router.events
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentUrl = this.router.url.split('/')[1];
        }
      });
  }

  closeNavbar(): void {
    const navbar = document.querySelector('#navbarSupportedContent');
    if (navbar && navbar.classList.contains('show')) {
      this.navbarToggler.nativeElement.click();
      this.navbarContent.nativeElement.click();
    }
  }

  showNavbar(): boolean {
    return ROUTES_PATH.VIDEO_CALL_PAGE !== this.currentUrl;
  }
}
