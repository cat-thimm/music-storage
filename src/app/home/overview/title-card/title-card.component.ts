import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

import { TitleView } from 'src/api';
import { MusicService } from 'src/app/common/services/music.service';

@Component({
  selector: 'app-title-card',
  templateUrl: './title-card.component.html',
  styleUrls: ['./title-card.component.scss'],
})
export class TitleCardComponent {
  @Input() title: TitleView | null = null;

  audioFile$: string | null = null;
  audio = new Audio();
  audioStarted = false;

  constructor(private musicService: MusicService) {}

  async playAudio(songId: number) {
    this.audioStarted = !this.audioStarted;
    if (this.audioStarted) {
      const audioFile = await this.musicService.downloadSong(songId.toString());

      this.audio.src = window.URL.createObjectURL(audioFile);
      this.audio.load();
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  async downloadSong(songId: string, title?: string) {
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
