import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_PATH } from '../../../shared/constants/routes';
import { emptyPhotoVideoCallGuard } from '../../../shared/guards/empty-photo-video-call.guard';
import { loggedGuard } from '../../../shared/guards/logged.guard';
import { VideoCallComponent } from './components/video-call/video-call.component';
import { VideoCallModule } from './components/video-call/video-call.module';

export const VIDEO_ROUTES: Routes = [
  {
    path: ROUTES_PATH.VIDEO_CALL_PAGE,
    component: VideoCallComponent,
    canActivate: [loggedGuard, emptyPhotoVideoCallGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, VideoCallModule, RouterModule.forChild(VIDEO_ROUTES)],
})
export class CommonVideoCallModule {}
