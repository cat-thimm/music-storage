import { Component, EventEmitter, Input, Output } from '@angular/core';

import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {
  ArtistView,
  GenreView,
  InstrumentView,
  MoodView,
  TitleControllerApiSearchTitlesRequest,
  TitleView,
} from 'src/api';
import {AddAlbumComponent} from "./add-album/add-album.component";
import {TitleCardComponent} from "./title-card/title-card.component";
import {FormsModule} from "@angular/forms";

import {MatCardContent} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss', '../../../styles.scss'],
  imports: [
    AddAlbumComponent,
    MatPaginator,
    TitleCardComponent,
    MatFormFieldModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardContent,
    MatIconModule,
    MatInput,
    MatButton
  ],
  standalone: true
})
export class OverviewComponent {
  @Input() dropdownGenre: GenreView[] | null = [];
  @Input() dropdownArtist: ArtistView[] | null = [];
  @Input() dropdownMood: MoodView[] | null = [];
  @Input() dropdownInstrument: InstrumentView[] | null = [];
  @Input() searchResults: TitleView[] | null = [];
  @Output() onSearch: EventEmitter<TitleControllerApiSearchTitlesRequest> =
    new EventEmitter();

  selectedGenre? = undefined;
  selectedArtist? = undefined;
  selectedMood? = undefined;
  selectedInstrument? = undefined;
  tempo? = undefined;

  currentPageIndex = 0;
  pageSize = 10;
  searchString = '';
  showAlbumModal = false;

  toggleModal() {
    this.showAlbumModal = !this.showAlbumModal;
  }

  currentResults = () =>
    this.searchResults?.slice(
      this.currentPageIndex * this.pageSize,
      this.pageSize * (this.currentPageIndex + 1)
    );

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.currentPageIndex = e.pageIndex;
  }

  search() {
    this.onSearch.emit({
      keyword:
        this.searchString && this.selectedArtist
          ? this.searchString + ' ' + this.selectedArtist
          : this.searchString && !this.selectedArtist
          ? this.searchString
          : this.selectedArtist,
      mood: this.selectedMood,
      genre: this.selectedGenre,
      instrument: this.selectedInstrument,
      tempo: this.tempo,
    });
  }
}
