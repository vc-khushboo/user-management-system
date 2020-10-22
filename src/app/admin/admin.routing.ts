import { Routes, RouterModule } from '@angular/router';
import { UserAddComponent } from './user-add/user-add.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: 'user/list', component: UserListComponent },
  { path: 'user/add', component: UserAddComponent },
  { path: 'user/edit/:userId', component: UserAddComponent }
];

export const AdminRoutes = RouterModule.forChild(routes);
