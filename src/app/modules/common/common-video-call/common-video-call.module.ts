import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCallModule } from './components/video-call/video-call.module';
import { RouterModule, Routes } from '@angular/router';
import { VideoCallComponent } from './components/video-call/video-call.component';
import { loggedGuard } from '../../../shared/guards/logged.guard';
import { ROUTES_PATH } from '../../../shared/constants/routes';

export const VIDEO_ROUTES: Routes = [
  {
    path: ROUTES_PATH.VIDEO_CALL_PAGE,
    component: VideoCallComponent,
    canActivate: [loggedGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, VideoCallModule, RouterModule.forChild(VIDEO_ROUTES)],
})
export class CommonVideoCallModule {}
