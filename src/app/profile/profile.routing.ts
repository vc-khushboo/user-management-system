import { Routes, RouterModule } from '@angular/router';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';

const routes: Routes = [
  { path: '', component: ProfileUpdateComponent },
];

export const ProfileRoutes = RouterModule.forChild(routes);
