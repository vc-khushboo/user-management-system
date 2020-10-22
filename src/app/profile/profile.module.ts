import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutes } from './profile.routing';
import { SharedModule } from '../shared/shared.module';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutes,
    SharedModule
  ],
  declarations: [ProfileUpdateComponent]
})
export class ProfileModule { }
