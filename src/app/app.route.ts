import { SignupComponent } from './signup/signup.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './_appconfig';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './commons/header/header.component';



export const ROUTES: Routes = [
    {
        path: '',
        component: HeaderComponent,
        canActivate: [AuthGuard],
        children: [            
            {
                path: '',
                loadChildren: () => import('./headerconfig/headerconfig.module').then(m => m.HeaderConfigComponentModule)
            },
            {
                path: 'Dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
            }
            ]
    }, 
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
]