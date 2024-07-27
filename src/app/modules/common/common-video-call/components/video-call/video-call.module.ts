import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCallComponent } from './video-call.component';
import { RateUserComponent } from '../rate-user/rate-user.component';
import { SpinnerGeneralModule } from '../../../../shared/spinner-general/spinner-general.module';

@NgModule({
  declarations: [VideoCallComponent],
  imports: [CommonModule, RateUserComponent, SpinnerGeneralModule],
})
export class VideoCallModule {}
