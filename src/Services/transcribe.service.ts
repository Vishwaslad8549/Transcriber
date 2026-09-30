import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../environments/environment.development";

export interface Segment { start: number; end: number; text: string; }
export interface Transcript { text: string; language: string; duration: number; segments: Segment[]; }

@Injectable({ providedIn: 'root' })
export class TranscribeService {
  private http = inject(HttpClient);

  transcribe(file: File) {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post<Transcript>(`${environment.apiUrl}/transcribe`, fd, {
      reportProgress: true,
      observe: 'events',
    });
  }
}