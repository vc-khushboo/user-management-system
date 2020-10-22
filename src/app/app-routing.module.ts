import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginAuthGuard, AuthGuard } from './shared/auth/auth-guard.service';
import { LayoutComponent } from './layout/layout.component';
import { ProfileModule } from './profile/profile.module';
import { AdminModule } from './admin/admin.module';

const routes: Routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full',
},
{ path: 'login', component: LoginComponent, canActivate: [LoginAuthGuard]},
{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: 'profile',
      loadChildren: () => ProfileModule,
      canActivate: [AuthGuard],
      data: { roles: ['2'] }
    },
    {
      path: 'admin',
      loadChildren: () => AdminModule,
      canActivate: [AuthGuard],
      data: { roles: ['1'] }
    }
  ],
},
{
  path: '**',
  redirectTo: 'login',
}];

@NgModule({
  imports: [
    // RouterModule.forRoot(routes)
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
