import { Component, ElementRef, inject, NgZone, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  exportAs:'LoginComponent'
})
export class LoginComponent implements OnInit{
private auth = inject(AuthService);
  private router = inject(Router);
  private zone = inject(NgZone);

  @ViewChild('googleBtn', { static: true }) btn!: ElementRef<HTMLElement>;

  loading = signal(false);
  error = signal<string | null>(null);

  async ngOnInit() {
    // Already logged in? Skip the login page
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/transcribe']);
      return;
    }

    try {
      await this.auth.loadGoogleScript();
    } catch {
      this.error.set('Could not load Google Sign-In. Check your connection or ad blocker.');
      return;
    }

    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (resp:any) => this.zone.run(() => this.onCredential(resp)),
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    google.accounts.id.renderButton(this.btn.nativeElement, {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular',
      width: 280,
    });
  }

  private async onCredential(resp: google.accounts.id.CredentialResponse) {
    this.loading.set(true);
    this.error.set(null);
    try {
      await this.auth.signInWithGoogle(resp.credential);
      this.router.navigate(['/transcribe']);
    } catch (e: any) {
      this.error.set(e?.error?.message ?? 'Sign-in failed. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }
}
