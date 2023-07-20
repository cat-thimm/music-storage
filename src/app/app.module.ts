import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing-module';
import { MaterialModule } from './material.module';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { DropdownComponent } from './home/dropdown/dropdown.component';
import { OverviewComponent } from './home/overview/overview.component';
import { TitleCardComponent } from './home/overview/title-card/title-card.component';
import { PlaylistsComponent } from './home/playlists/playlists.component';
import { AddSongComponent } from './home/add-song/add-song.component';
import { MultiselectAutocompleteComponent } from './home/add-song/multiselect-autocomplete/multiselect-autocomplete.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddPlaylistModalComponent } from './home/playlists/add-playlist-modal/add-playlist-modal.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    NgSelectModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    DropdownComponent,
    OverviewComponent,
    TitleCardComponent,
    PlaylistsComponent,
    AddSongComponent,
    MultiselectAutocompleteComponent,
    AddPlaylistModalComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
