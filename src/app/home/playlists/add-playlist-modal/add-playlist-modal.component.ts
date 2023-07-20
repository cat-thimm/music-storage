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
  cover: any | null = null;

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

  setFileData(files: FileList | null) {
    if (files) {
      this.cover = files[0];
    }
  }

  async createPlaylist() {
    const titles = this.resultsWithCheck
      .filter((result: any) => result.checked)
      .map((filteredResult: any) => filteredResult.id);

    const reader = new FileReader();

    reader.readAsDataURL(this.cover);

    reader.onload = async () => {
      const playlist: PrivatePlaylistCreateDTO = {
        playlist: {
          name: this.playlistName,
          text: this.description,
          // @ts-ignore
          previewPicture: reader.result.split(',')[1],
          user: this.authenticationService.user,
        },
        titles: titles,
      };

      await this.playlistService.createPrivatePlaylist(playlist);
      this.closeModal();
    };
  }
}
