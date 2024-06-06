import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BREAKPOINTS } from '../enums/windowSize.enum';
@Injectable({
  providedIn: 'root',
})
export class BreakPointService {
  private breakpoints = {
    /* TODO: I can't use windowSize enum because numbers change one pixel */
    extra_small: window.matchMedia('(min-width: 350px) and (max-width: 576px)'),
    small: window.matchMedia('(min-width: 577px) and (max-width: 768px)'),
    medium: window.matchMedia('(min-width: 769px) and (max-width: 1024px)'),
    large: window.matchMedia('(min-width: 1025px) and (max-width: 1280px)'),
    extra_large: window.matchMedia(
      '(min-width: 1281px) and (max-width: 1366px)'
    ),
    extra_extra_large: window.matchMedia('(min-width: 1367px)'),
  };

  private currentBreakpointSubject = new BehaviorSubject<string>(
    this.getCurrentBreakpoint()
  );

  public currentBreakpoint: Observable<string> = this.onBreakpointChange();

  constructor(private ngZone: NgZone) {
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
}
