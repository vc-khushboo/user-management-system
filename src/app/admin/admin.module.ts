import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutes } from './admin.routing';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';

@NgModule({
  imports: [CommonModule, AdminRoutes, SharedModule, MatTableModule],
  declarations: [UserListComponent, UserAddComponent],
})
export class AdminModule {}
