import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
//import { AuthGuard } from './authentication';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { StaffComponent } from './staff/staff.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, },
  //    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard/:livePage', component: DashboardComponent },
   // { path: 'staff', component: StaffComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: "dashboard", pathMatch: "full" },
    { path: '**', redirectTo: 'dashboard', pathMatch: "full" }
];

export const routing = RouterModule.forRoot(appRoutes);