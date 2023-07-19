import { Component, OnInit } from '@angular/core';
import { MusicService } from '../common/services/music.service';
import { AuthenticationService } from '../common/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../styles.scss'],
})
export class HomeComponent implements OnInit {
  dropdownGenre$: any = [];
  dropdownArtist$: any = [];
  dropdownMood$: any = [];
  dropdownInstrument$: any = [];
  dropdownTempo$: any = [];

  searchResults$: any = [];

  playlists$: any = [];

  constructor(
    private musicService: MusicService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.fetchTitles();
  }

  async fetchTitles() {
    this.searchResults$ = await this.musicService.getAllTitles();
  }

  logout() {
    this.authenticationService.user = undefined;
    localStorage.clear();
  }
}
