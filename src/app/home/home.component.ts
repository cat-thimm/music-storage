import {Component} from '@angular/core';
import {MusicService} from "../common/services/music.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  dropdownGenre = this.musicService.dropdownGenre
  dropdownArtist = this.musicService.dropdownArtist
  dropdownMood = this.musicService.dropdownMood
  dropdownInstrument = this.musicService.dropdownInstrument
  dropdownTempo = this.musicService.dropdownTempo

  searchResults = this.musicService.searchResults

  constructor(private musicService: MusicService) {
  }
}
