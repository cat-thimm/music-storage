import { Component, OnInit } from '@angular/core';

import {
  ArtistView,
  GenreView,
  InstrumentView,
  MoodView,
  PrivatePlaylistView,
  PublicPlaylistView,
  TitleControllerApiSearchTitlesRequest,
  TitleView,
  UserViewRoleEnum,
} from 'src/api';

import { AuthenticationService } from '../common/services/authentication.service';
import { PlaylistService } from '../common/services/playlist.service';
import { MusicService } from '../common/services/music.service';
import { TabsService } from '../common/services/tabs.service';
import {AddSongComponent} from "./add-song/add-song.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {OverviewComponent} from "./overview/overview.component";
import {MatCard} from "@angular/material/card";
import {PlaylistsComponent} from "./playlists/playlists.component";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../styles.scss'],
  imports: [
    AddSongComponent,
    MatTab,
    OverviewComponent,
    MatTabGroup,
    MatCard,
    PlaylistsComponent,
    MatToolbar,
    MatIconModule,
    RouterLink,
    MatButton
  ],
  standalone: true
})
export class HomeComponent implements OnInit {
  dropdownArtist$: ArtistView[] | null = null;
  dropdownMood$: MoodView[] | null = null;
  dropdownInstrument$: InstrumentView[] | null = null;
  dropdownGenre$: GenreView[] | null = null;

  searchResults$: TitleView[] | null = null;

  privatePlaylist$: PrivatePlaylistView[] | null = null;
  publicPlaylists$: PublicPlaylistView[] | null = null;

  constructor(
    private musicService: MusicService,
    public authenticationService: AuthenticationService,
    private tabsService: TabsService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.fetchTitles();
    await this.fetchTabs();
    if (this.authenticationService.userRole === UserViewRoleEnum.LABEL) {
      await this.fetchPublicPlaylists();
    } else {
      await this.fetchPrivatePlaylists();
    }
  }

  async searchTitle(searchString: TitleControllerApiSearchTitlesRequest) {
    this.searchResults$ = await this.musicService.searchTitle(searchString);
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

  async fetchPublicPlaylists() {
    this.publicPlaylists$ = await this.playlistService.getPublicPlaylist(
      this.authenticationService.labelId
    );
  }

  logout() {
    this.authenticationService.user = undefined;
    this.authenticationService.labelId = undefined;
    this.authenticationService.userRole = undefined;
    localStorage.clear();
  }
}
