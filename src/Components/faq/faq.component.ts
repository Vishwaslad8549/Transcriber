import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaService } from '../../Services/meta.service';

interface FAQItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent implements OnInit {
  private metaService = inject(MetaService);
  
  expandedIndex: number | null = null;

  faqs: FAQItem[] = [
    {
      question: 'What file formats does AI Transcriber support?',
      answer: 'AI Transcriber supports MP3, WAV, FLAC, AAC, OGG, and M4A audio formats, plus MP4, AVI, and MOV video formats. Maximum file size is 200MB per upload.'
    },
    {
      question: 'How accurate is the AI transcription service?',
      answer: 'Our AI transcription achieves 95%+ accuracy for clear audio recordings. Accuracy depends on audio quality, background noise, accent clarity, and speaking pace.'
    },
    {
      question: 'Is AI Transcriber completely free to use?',
      answer: 'Yes, AI Transcriber is 100% free with no hidden costs, subscription fees, or usage limits. Simply sign in with Google and start transcribing immediately.'
    },
    {
      question: 'How long does audio transcription take?',
      answer: 'Processing time varies by file length. Typically: 5-minute audio = 1-2 minutes, 30-minute audio = 3-5 minutes, 60-minute audio = 5-10 minutes.'
    },
    {
      question: 'Is my audio data secure and private?',
      answer: 'Absolutely. We use secure HTTPS encryption, don\'t store files on servers after processing, and require Google OAuth authentication for enhanced security.'
    },
    {
      question: 'Can I download or copy the transcribed text?',
      answer: 'Yes, you can copy transcripts to clipboard with one click or download as .txt files. Timestamps can be included or excluded based on your preference.'
    },
    {
      question: 'Does the transcription include timestamps?',
      answer: 'Yes, all transcriptions automatically include precise timestamps. You can choose to copy/download text with or without timestamps as needed.'
    },
    {
      question: 'What languages does AI Transcriber support?',
      answer: 'Currently optimized for English transcription with plans to expand to Spanish, French, German, and other major languages in future updates.'
    },
    {
      question: 'Can I transcribe multiple files at once?',
      answer: 'You can transcribe files one at a time. For batch processing of multiple files, upload and transcribe them sequentially. Each transcription is independent.'
    },
    {
      question: 'Is there a limit to how many files I can transcribe?',
      answer: 'No, there\'s no limit! You can transcribe as many files as you need. The free service is unlimited with no restrictions on usage.'
    }
  ];

  ngOnInit() {
    // Set meta tags for FAQ page
    // The updateMeta method automatically adds FAQ structured data
    this.metaService.updateMeta({
      title: 'FAQ - AI Transcriber | Frequently Asked Questions',
      description: 'Find answers to common questions about AI Transcriber. Learn about file formats, accuracy, privacy, pricing, and how to use our free transcription service.',
      url: 'https://transcribe.vishwasladweb.site/faq'
    });
  }

  toggleExpand(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
}
