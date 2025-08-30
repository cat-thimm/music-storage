import {Component, Input} from '@angular/core';
import {PrivatePlaylistView, PublicPlaylistView, TitleView} from 'src/api';
import {AddPlaylistModalComponent} from "./add-playlist-modal/add-playlist-modal.component";
import {MatList, MatListItem} from "@angular/material/list";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
  imports: [
    AddPlaylistModalComponent,
    MatListItem,
    MatList,
    MatCardContent,
    MatIconModule,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatButton
  ],
  standalone: true
})
export class PlaylistsComponent {
  @Input() playlists: PrivatePlaylistView[] | PublicPlaylistView[] | null = [];
  @Input() searchResults: TitleView[] | null = [];

  showModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
