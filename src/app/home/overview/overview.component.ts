import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';
import {
  ArtistView,
  GenreView,
  InstrumentView,
  MoodView,
  TitleControllerApiSearchTitlesRequest,
  TitleView,
} from 'src/api';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss', '../../../styles.scss'],
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
      keyword: this.searchString + ' ' + this.dropdownArtist,
      mood: this.selectedMood,
      genre: this.selectedGenre,
      instrument: this.selectedInstrument,
      tempo: this.tempo,
    });
  }
}
