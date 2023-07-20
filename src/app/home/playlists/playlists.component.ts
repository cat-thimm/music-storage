import { Component, Input } from '@angular/core';
import { PrivatePlaylistView, TitleView } from 'src/api';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent {
  @Input() playlists: PrivatePlaylistView[] = [];
  @Input() searchResults: TitleView[] | null = [];

  showModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
