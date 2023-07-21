import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TitleView, UserViewRoleEnum } from 'src/api';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { MusicService } from 'src/app/common/services/music.service';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss'],
})
export class AddAlbumComponent implements OnInit {
  @Input() showModal = false;
  @Output() showModalChange = new EventEmitter<boolean>();
  @Input() searchResults: TitleView[] | null = [];

  resultsWithCheck: any;

  playlistName = '';
  description = '';
  cover: any | null = null;
  year = '';

  constructor(
    private authService: AuthenticationService,
    private musicService: MusicService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.resultsWithCheck = this.searchResults?.map((result) => ({
      id: result.id,
      name: result.name,
      checked: false,
    }));
  }

  async createAlbum() {
    const titles = this.resultsWithCheck
      .filter((result: any) => result.checked)
      .map((filteredResult: any) => filteredResult.id);

    const reader = new FileReader();

    await this.musicService.createAlbum(
      // @ts-ignore
      this.cover,
      this.authService.labelId || 0,
      this.playlistName,
      1,
      this.description,
      new Date(this.year).toISOString().split('T')[0],
      titles
    );
    this.closeModal();
  }

  closeModal() {
    this.showModalChange.emit(false);
  }

  setFileData(files: FileList | null) {
    if (files) {
      this.cover = files[0];
    }
  }
}
