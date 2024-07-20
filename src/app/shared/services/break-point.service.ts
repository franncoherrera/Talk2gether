import { inject, Injectable, NgZone } from '@angular/core';
import {
  BehaviorSubject,
  fromEvent,
  map,
  merge,
  Observable,
  of,
  startWith,
} from 'rxjs';
import { BREAKPOINTS } from '../constants/windowSize.enum';
@Injectable({
  providedIn: 'root',
})
export class BreakPointService {
  private breakpoints = {
    extra_small: window.matchMedia('(min-width: 350px) and (max-width: 576px)'),
    small: window.matchMedia('(min-width: 577px) and (max-width: 768px)'),
    medium: window.matchMedia('(min-width: 769px) and (max-width: 992px)'),
    large: window.matchMedia('(min-width: 993px) and (max-width: 1280px)'),
    extra_large: window.matchMedia(
      '(min-width: 1281px) and (max-width: 1366px)'
    ),
    extra_extra_large: window.matchMedia('(min-width: 1367px)'),
  };

  private currentBreakpointSubject = new BehaviorSubject<string>(
    this.getCurrentBreakpoint()
  );

  public currentBreakpoint$: Observable<string> = this.onBreakpointChange();

  public isMobile$: Observable<boolean> = this.isMobile();

  private ngZone: NgZone = inject(NgZone);

  constructor() {
    this.listenToResize();
  }

  private getCurrentBreakpoint(): string {
    if (this.breakpoints.extra_small.matches)
      return BREAKPOINTS.EXTRA_SMALL.NAME_SIZE;
    if (this.breakpoints.small.matches) return BREAKPOINTS.SMALL.NAME_SIZE;
    if (this.breakpoints.large.matches) return BREAKPOINTS.MEDIUM.NAME_SIZE;
    if (this.breakpoints.medium.matches) return BREAKPOINTS.LARGE.NAME_SIZE;
    if (this.breakpoints.large.matches)
      return BREAKPOINTS.EXTRA_LARGE.NAME_SIZE;
    if (this.breakpoints.extra_large.matches)
      return BREAKPOINTS.EXTRA_LARGE.NAME_SIZE;
    if (this.breakpoints.extra_extra_large.matches)
      return BREAKPOINTS.EXTRA_EXTRA_LARGE.NAME_SIZE;
    return 'unknown';
  }

  private listenToResize(): void {
    const handleResize = () => {
      const newBreakpoint = this.getCurrentBreakpoint();
      if (newBreakpoint !== this.currentBreakpointSubject.value) {
        this.ngZone.run(() => {
          this.currentBreakpointSubject.next(newBreakpoint);
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
  }

  private onBreakpointChange(): Observable<string> {
    return this.currentBreakpointSubject.asObservable();
  }

  private isMobile(): Observable<boolean> {
    const checkScreenSize = () => window.innerWidth < 992;
    const resize$ = fromEvent(window, 'resize').pipe(map(checkScreenSize));
    return merge(of(checkScreenSize()), resize$).pipe(
      startWith(checkScreenSize())
    );
  }
}
