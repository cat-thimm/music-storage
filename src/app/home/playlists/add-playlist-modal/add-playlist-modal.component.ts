import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrivatePlaylistCreateDTO, TitleView } from 'src/api';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { PlaylistService } from 'src/app/common/services/playlist.service';

@Component({
  selector: 'app-add-playlist-modal',
  templateUrl: './add-playlist-modal.component.html',
  styleUrls: ['./add-playlist-modal.component.scss'],
})
export class AddPlaylistModalComponent implements OnInit {
  @Input() showModal = false;
  @Output() showModalChange = new EventEmitter<boolean>();
  @Input() searchResults: TitleView[] | null = [];

  resultsWithCheck: any;
  playlistName = '';
  description = '';

  constructor(
    private playlistService: PlaylistService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log('Changed ');
    this.resultsWithCheck = this.searchResults?.map((result) => ({
      id: result.id,
      name: result.name,
      checked: false,
    }));
  }

  closeModal() {
    this.showModalChange.emit(false);
  }

  async createPlaylist() {
    console.log('>>> test');
    const titles = this.resultsWithCheck
      .filter((result: any) => result.checked)
      .map((filteredResult: any) => filteredResult.id);

    const playlist: PrivatePlaylistCreateDTO = {
      playlist: {
        name: this.playlistName,
        text: this.description,
        user: this.authenticationService.user,
      },
      titles: titles,
    };

    await this.playlistService.createPrivatePlaylist(playlist);
  }
}
