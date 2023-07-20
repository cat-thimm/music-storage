import { Component, OnInit } from '@angular/core';

import { ArtistView, InstrumentView, MoodView, TitleView } from 'src/api';

import { AuthenticationService } from '../common/services/authentication.service';
import { PlaylistService } from '../common/services/playlist.service';
import { MusicService } from '../common/services/music.service';
import { TabsService } from '../common/services/tabs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../styles.scss'],
})
export class HomeComponent implements OnInit {
  dropdownArtist$: ArtistView[] | null = null;
  dropdownMood$: MoodView[] | null = null;
  dropdownInstrument$: InstrumentView[] | null = [];
  dropdownTempo$?: any = [];
  dropdownGenre$: any = [];

  searchResults$: TitleView[] | null = [];

  privatePlaylist$: any = [];

  constructor(
    private musicService: MusicService,
    private authenticationService: AuthenticationService,
    private tabsService: TabsService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.fetchTitles();
    this.fetchTabs();
    this.fetchPrivatePlaylists();
  }

  async fetchTitles() {
    this.searchResults$ = await this.musicService.getAllTitles();
  }

  async fetchTabs() {
    this.dropdownGenre$ = await this.tabsService.getGenres();
    this.dropdownArtist$ = await this.tabsService.getArtists();
    this.dropdownInstrument$ = await this.tabsService.getInstruments();
    this.dropdownMood$ = await this.tabsService.getMoods();
  }

  async fetchPrivatePlaylists() {
    if (this.authenticationService.user?.username)
      this.privatePlaylist$ = await this.playlistService.getPrivatePlaylists(
        this.authenticationService.user?.username
      );
  }

  logout() {
    this.authenticationService.user = undefined;
    localStorage.clear();
  }
}
