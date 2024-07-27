import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCallComponent } from './video-call.component';
import { RateUserComponent } from '../rate-user/rate-user.component';



@NgModule({
  declarations: [VideoCallComponent],
  imports: [
    CommonModule,
    RateUserComponent
  ]
})
export class VideoCallModule { }
