import { Routes } from '@angular/router';
import { LoginComponent } from '../Components/login/login.component';
import { TranscribeComponent } from '../Components/transcribe/transcribe.component';
import { authGuard } from '../Gurads/AuthGuard/auth.guard';

export const routes: Routes = [
    {path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'transcribe', component: TranscribeComponent, canActivate: [authGuard] },
    
];
