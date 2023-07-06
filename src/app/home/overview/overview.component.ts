import {Component, Input} from '@angular/core';

import {Title} from "../../common/models/title";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss', '../../../styles.scss']
})
export class OverviewComponent {
  @Input() dropdownGenre: string[] = []
  @Input() dropdownArtist: string[] = []
  @Input() dropdownMood: string[] = []
  @Input() dropdownInstrument: string[] = []
  @Input() dropdownTempo: string[] = []
  @Input() searchResults: Title[] = []

  currentPageIndex = 0;
 pageSize = 10;

 length = this.searchResults.length

  handlePageEvent(e: PageEvent) {
    // this.pageEvent = e;
    // this.length = e.length;
    this.pageSize = e.pageSize;
    this.currentPageIndex = e.pageIndex;
  }

}
