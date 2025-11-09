import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as Sentry from "@sentry/angular";
import {AppRoutingModule} from './app-routing-module';
import {MaterialModule} from './material.module';
import {APP_INITIALIZER, ApplicationConfig, ErrorHandler} from '@angular/core';

import {AppComponent} from './app.component';

// Standalone features may stay in `imports`
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {HomeComponent} from './home/home.component';
import {DropdownComponent} from './home/dropdown/dropdown.component';
import {OverviewComponent} from './home/overview/overview.component';
import {TitleCardComponent} from './home/overview/title-card/title-card.component';
import {PlaylistsComponent} from './home/playlists/playlists.component';
import {AddSongComponent} from './home/add-song/add-song.component';
import {AddPlaylistModalComponent} from './home/playlists/add-playlist-modal/add-playlist-modal.component';
import {AddAlbumComponent} from './home/overview/add-album/add-album.component';
import {Router} from "@angular/router";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,

    // standalone components stay here:
    AddAlbumComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    DropdownComponent,
    OverviewComponent,
    TitleCardComponent,
    PlaylistsComponent,
    AddSongComponent,
    AddPlaylistModalComponent
  ],
  declarations: [
    AppComponent // <-- declare root component (must NOT be standalone)
  ],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler(),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {
      },
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent] // <-- tell Angular what to bootstrap
})
export class AppModule {
}


// keep your existing bootstrap call (preferably move it to main.ts)
