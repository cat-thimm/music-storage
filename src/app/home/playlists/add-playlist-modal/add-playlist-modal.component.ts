import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TitleView } from 'src/api';

@Component({
  selector: 'app-add-playlist-modal',
  templateUrl: './add-playlist-modal.component.html',
  styleUrls: ['./add-playlist-modal.component.scss'],
})
export class AddPlaylistModalComponent implements OnInit {
  @Input() showModal = false;
  @Output() showModalChange = new EventEmitter<boolean>();
  @Input() searchResults: TitleView[] | null = [];

  resultsWithCheck: any;

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log('Changed ');
    this.resultsWithCheck = this.searchResults?.map((result) => ({
      ...result,
      checked: false,
    }));
  }

  playlistName = '';
}
