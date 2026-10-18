import { Component, inject, OnInit } from '@angular/core';
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
    // Set comprehensive meta tags for the app
    // The updateMeta method now handles all structured data automatically
    this.metaService.updateMeta({
      title: 'AI Transcriber - Convert Audio & Video to Text',
      description: '⭐ Free AI Transcriber - Convert MP3 & MP4 to text instantly. 95% accurate. No signup needed. Download or copy transcripts with timestamps. Try free!',
      url: 'https://transcribe.vishwasladweb.site'
    });
  }
}
