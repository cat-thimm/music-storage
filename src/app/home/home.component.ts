import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {MatTabGroup, MatTab} from '@angular/material/tabs';

import {
  ArtistView, GenreView, InstrumentView, MoodView,
  PrivatePlaylistView, PublicPlaylistView,
  TitleControllerApiSearchTitlesRequest, TitleView,
  UserViewRoleEnum,
} from 'src/api';

import {AuthenticationService} from '../common/services/authentication.service';
import {PlaylistService} from '../common/services/playlist.service';
import {MusicService} from '../common/services/music.service';
import {TabsService} from '../common/services/tabs.service';


import {AddSongComponent} from './add-song/add-song.component';
import {OverviewComponent} from './overview/overview.component';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../styles.scss'],
  imports: [
    CommonModule, RouterLink,
    MatToolbar, MatIconModule, MatButton,
    MatCard, MatTabGroup, MatTab,
    OverviewComponent, AddSongComponent,
  ],
})
export class HomeComponent implements OnInit {
  private readonly musicService = inject(MusicService);
  readonly authenticationService = inject(AuthenticationService);
  private readonly tabsService = inject(TabsService);
  private readonly playlistService = inject(PlaylistService);

  readonly UserRole = UserViewRoleEnum;

  dropdownArtist$: ArtistView[] | null = null;
  dropdownMood$: MoodView[] | null = null;
  dropdownInstrument$: InstrumentView[] | null = null;
  dropdownGenre$: GenreView[] | null = null;

  searchResults$: TitleView[] | null = null;

  privatePlaylist$: PrivatePlaylistView[] | null = null;
  publicPlaylists$: PublicPlaylistView[] | null = null;

  async ngOnInit() {
    await this.init();
  }

  private async init() {
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

  private async fetchTitles() {
    this.searchResults$ = await this.musicService.getAllTitles();
  }

  private async fetchTabs() {
    this.dropdownGenre$ = await this.tabsService.getGenres();
    this.dropdownArtist$ = await this.tabsService.getArtists();
    this.dropdownInstrument$ = await this.tabsService.getInstruments();
    this.dropdownMood$ = await this.tabsService.getMoods();
  }

  private async fetchPrivatePlaylists() {
    const username = this.authenticationService.user?.username;
    if (username) {
      this.privatePlaylist$ = await this.playlistService.getPrivatePlaylists(username);
    }
  }

  private async fetchPublicPlaylists() {
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

  // get playlists() {
  //   return this.privatePlaylist$ ?? this.publicPlaylists$;
  // }
}
