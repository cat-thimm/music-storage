import { Component, Input } from '@angular/core';
import { PrivatePlaylistView, PublicPlaylistView, TitleView } from 'src/api';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent {
  @Input() playlists: PrivatePlaylistView[] | PublicPlaylistView[] | null = [];
  @Input() searchResults: TitleView[] | null = [];

  showModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
