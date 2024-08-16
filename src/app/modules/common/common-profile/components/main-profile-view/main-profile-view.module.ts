import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainProfileViewComponent } from './main-profile-view.component';

@NgModule({
  declarations: [MainProfileViewComponent],
  imports: [CommonModule],
  exports: [MainProfileViewComponent],
})
export class MainProfileViewModule {}
