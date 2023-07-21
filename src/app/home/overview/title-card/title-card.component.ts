import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { TitleView } from 'src/api';
import { MusicService } from 'src/app/common/services/music.service';

@Component({
  selector: 'app-title-card',
  templateUrl: './title-card.component.html',
  styleUrls: ['./title-card.component.scss'],
})
export class TitleCardComponent implements OnInit {
  @Input() title: TitleView | null = null;

  audioFile$: string | null = null;
  audio = new Audio();
  audioStarted = false;
  cover: any = null;

  constructor(
    private musicService: MusicService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getCover(this.title?.cover);
  }

  async playAudio(songId: number) {
    this.audioStarted = !this.audioStarted;
    if (this.audioStarted) {
      const audioFile = await this.musicService.downloadSong(songId);

      this.audio.src = window.URL.createObjectURL(audioFile);
      this.audio.load();
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  getCover(cover?: any) {
    if (!cover) {
      return;
    }

    let objectURL = 'data:image/jpeg;base64,' + cover;

    this.cover = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  async downloadSong(songId?: number, title?: string) {
    if (songId) {
      const song = await this.musicService.downloadSong(songId);

      if (song) {
        const data = window.URL.createObjectURL(song);

        var link = document.createElement('a');
        link.href = data;
        link.download = title || '';
        link.click();
      }
    }
  }
}
