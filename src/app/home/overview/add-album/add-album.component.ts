import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TitleView } from 'src/api';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { MusicService } from 'src/app/common/services/music.service';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss'],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatCheckbox,
    MatDatepickerInput,
    MatInput,
    MatButton
  ],
  standalone: true
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
