import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranscribeComponent } from '../Components/transcribe/transcribe.component';
import { LoginComponent } from '../Components/login/login.component';
import { MetaService } from '../Services/meta.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranscribeComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'AI Transcriber';
  private metaService = inject(MetaService);
  
  ngOnInit() {
    // Set default meta tags for the app
    this.metaService.updateMeta({
      title: 'AI Transcriber - Convert Audio & Video to Text',
      description: 'Free AI-powered transcription service. Upload MP3 audio or MP4 video files and get accurate speech-to-text conversion with timestamps. Fast, secure, and easy to use.',
      url: 'https://transcribe.vishwasladweb.site'
    });
    
    // Add structured data
    this.metaService.addStructuredData(this.metaService.getAppStructuredData());
  }
}
