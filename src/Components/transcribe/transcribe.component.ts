import { HttpEventType, HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, inject, ViewChild, ElementRef, signal, computed } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../../Services/auth.service";
import { TranscribeService, Transcript } from "../../Services/transcribe.service";

type Phase = 'idle' | 'uploading' | 'processing' | 'done' | 'error';

const MAX_MB = 200;
const ALLOWED_EXT = ['.mp3', '.mp4'];

@Component({
  selector: 'app-transcribe',
  standalone: true,
  templateUrl: './transcribe.component.html',
  styleUrl: './transcribe.component.scss',
})
export class TranscribeComponent implements OnDestroy {
  private api = inject(TranscribeService);
  auth = inject(AuthService);

  @ViewChild('player') player?: ElementRef<HTMLMediaElement>;

  file = signal<File | null>(null);
  mediaUrl = signal<string | null>(null);
  phase = signal<Phase>('idle');
  progress = signal(0);
  transcript = signal<Transcript | null>(null);
  error = signal<string | null>(null);
  dragging = signal(false);
  currentTime = signal(0);

  // Segment currently being played, for highlighting
  activeIndex = computed(() => {
    const t = this.currentTime();
    return this.transcript()?.segments.findIndex((s) => t >= s.start && t < s.end) ?? -1;
  });

  private sub?: Subscription;

  onPick(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (f) this.setFile(f);
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    this.dragging.set(false);
    const f = e.dataTransfer?.files?.[0];
    if (f) this.setFile(f);
  }

  private setFile(f: File) {
    const ext = f.name.slice(f.name.lastIndexOf('.')).toLowerCase();
    if (!ALLOWED_EXT.includes(ext)) return this.fail('Only MP3 and MP4 files are supported');
    if (f.size > MAX_MB * 1024 * 1024) return this.fail(`File is too large (max ${MAX_MB}MB)`);

    this.reset();
    this.file.set(f);
    this.mediaUrl.set(URL.createObjectURL(f));
  }

  start() {
    const f = this.file();
    if (!f) return;

    this.error.set(null);
    this.transcript.set(null);
    this.progress.set(0);
    this.phase.set('uploading');

    this.sub = this.api.transcribe(f).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          const pct = Math.round((event.loaded / event.total) * 100);
          this.progress.set(pct);
          // Upload finished, now the server is working
          if (pct === 100) this.phase.set('processing');
        } else if (event.type === HttpEventType.Response) {
          this.transcript.set(event.body);
          this.phase.set('done');
        }
      },
      error: (e: HttpErrorResponse) => {
        const msg = e.status === 0
          ? 'Cannot reach the server'
          : e.error?.message ?? 'Something went wrong';
        this.fail(msg);
      },
    });
  }

  cancel() {
    this.sub?.unsubscribe(); // aborts the in-flight request
    this.phase.set('idle');
    this.progress.set(0);
  }

  seek(t: number) {
    const el = this.player?.nativeElement;
    if (!el) return;
    el.currentTime = t;
    el.play();
  }

  onTimeUpdate() {
    this.currentTime.set(this.player?.nativeElement.currentTime ?? 0);
  }

  copy() {
    navigator.clipboard.writeText(this.plainText());
  }

  download() {
    const blob = new Blob([this.plainText()], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${this.file()?.name.replace(/\.[^.]+$/, '') ?? 'transcript'}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  fmt(sec: number) {
    const s = Math.floor(sec);
    const h = Math.floor(s / 3600);
    const m = String(Math.floor((s % 3600) / 60)).padStart(h ? 2 : 1, '0');
    const r = String(s % 60).padStart(2, '0');
    return h ? `${h}:${m}:${r}` : `${m}:${r}`;
  }

  private plainText() {
    return (this.transcript()?.segments ?? [])
      .map((s) => `[${this.fmt(s.start)}] ${s.text}`)
      .join('\n');
  }

  private fail(msg: string) {
    this.error.set(msg);
    this.phase.set('error');
  }

  private reset() {
    this.sub?.unsubscribe();
    const old = this.mediaUrl();
    if (old) URL.revokeObjectURL(old);
    this.file.set(null);
    this.mediaUrl.set(null);
    this.transcript.set(null);
    this.error.set(null);
    this.progress.set(0);
    this.phase.set('idle');
  }

  ngOnDestroy() {
    this.reset();
  }
}