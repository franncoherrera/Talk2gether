import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ModalComponent } from '../../../../shared/bootstrap-modal/bootstrap-modal.component';
import { InputFormComponent } from '../../../../shared/input-form/input-form.component';

@Component({
  selector: 'fhv-delete-personal-account',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    TranslateModule,
    InputFormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './delete-personal-account.component.html',
  styleUrl: './delete-personal-account.component.scss',
})
export class DeletePersonalAccountComponent {}
