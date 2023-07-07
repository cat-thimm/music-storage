import {Component, Input} from '@angular/core';
import {Playlist} from "../../common/models/playlist";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent {
  @Input() playlists: Playlist[] = []
}
