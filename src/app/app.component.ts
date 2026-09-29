import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranscribeComponent } from '../Components/transcribe/transcribe.component';
import { LoginComponent } from '../Components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranscribeComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'transcriberFE';
}
