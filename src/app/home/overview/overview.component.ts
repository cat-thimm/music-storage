import { Component, Input } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';
import { ArtistView, InstrumentView, MoodView, TitleView } from 'src/api';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss', '../../../styles.scss'],
})
export class OverviewComponent {
  @Input() dropdownGenre: string[] = [];
  @Input() dropdownArtist: ArtistView[] | null = [];
  @Input() dropdownMood: MoodView[] | null = [];
  @Input() dropdownInstrument: InstrumentView[] | null = [];
  @Input() dropdownTempo: string[] = [];
  @Input() searchResults: TitleView[] | null = [];

  currentPageIndex = 0;
  pageSize = 10;

  currentResults = () =>
    this.searchResults?.slice(
      this.currentPageIndex * this.pageSize,
      this.pageSize * (this.currentPageIndex + 1)
    )

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.currentPageIndex = e.pageIndex;
  }
}
