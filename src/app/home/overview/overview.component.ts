import { Component, Input } from '@angular/core';

import { Title } from '../../common/models/title';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss', '../../../styles.scss'],
})
export class OverviewComponent {
  @Input() dropdownGenre: string[] = [];
  @Input() dropdownArtist: string[] = [];
  @Input() dropdownMood: string[] = [];
  @Input() dropdownInstrument: string[] = [];
  @Input() dropdownTempo: string[] = [];
  @Input() searchResults?: Title[] = [];

  currentPageIndex = 0;
  pageSize = 10;

  currentResults = () =>
    this.searchResults?.slice(
      this.currentPageIndex * this.pageSize,
      this.pageSize * (this.currentPageIndex + 1)
    );

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.currentPageIndex = e.pageIndex;
  }
}
