import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../environments/environment";

export interface Segment { start: number; end: number; text: string; }
export interface Transcript { 
  text: string; 
  language: string; 
  duration?: number; 
  confidence?: number;
  segments: Segment[]; 
  request_id?: string;
}

export type TranscriptionMode = 'hindi' | 'auto' | 'codemix';

@Injectable({ providedIn: 'root' })
export class TranscribeService {
  private http = inject(HttpClient);

  transcribe(file: File, mode: TranscriptionMode = 'hindi') {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post<Transcript>(`${environment.apiUrl}/transcribe?mode=${mode}`, fd, {
      reportProgress: true,
      observe: 'events',
    });
  }
}