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

  /**
   * Retrieves the current breakpoint name based on the active screen size.
   *
   * @returns The name of the current breakpoint, or 'unknown' if none match.
   */
  private getCurrentBreakpoint(): string {
    if (this.breakpoints.extra_small.matches)
      return BREAKPOINTS.EXTRA_SMALL.NAME_SIZE;
    if (this.breakpoints.small.matches) return BREAKPOINTS.SMALL.NAME_SIZE;
    if (this.breakpoints.medium.matches) return BREAKPOINTS.MEDIUM.NAME_SIZE;
    if (this.breakpoints.large.matches) return BREAKPOINTS.LARGE.NAME_SIZE;
    if (this.breakpoints.extra_large.matches)
      return BREAKPOINTS.EXTRA_LARGE.NAME_SIZE;
    if (this.breakpoints.extra_extra_large.matches)
      return BREAKPOINTS.EXTRA_EXTRA_LARGE.NAME_SIZE;
    return 'unknown';
  }

  /**
   * Sets up a listener for window resize events to update the current breakpoint.
   *
   * This method adds an event listener to the window's resize event and updates
   * the current breakpoint observable if the breakpoint changes.
   */
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

  /**
   * Provides an observable that emits the current breakpoint whenever it changes.
   *
   * @returns An observable that emits the current breakpoint as a string.
   */
  private onBreakpointChange(): Observable<string> {
    return this.currentBreakpointSubject.asObservable();
  }

  /**
   * Checks if the current screen width is considered mobile (less than 992px).
   *
   * @returns An observable that emits `true` if the screen width is less than 992px,
   *          or `false` otherwise.
   */
  private isMobile(): Observable<boolean> {
    const checkScreenSize = () => window.innerWidth < 992;
    const resize$ = fromEvent(window, 'resize').pipe(map(checkScreenSize));
    return merge(of(checkScreenSize()), resize$).pipe(
      startWith(checkScreenSize())
    );
  }
}
