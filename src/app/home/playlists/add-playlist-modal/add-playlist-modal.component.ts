import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  LabelControllerApi,
  PrivatePlaylistCreateDTO,
  TitleView,
  UserViewRoleEnum,
} from 'src/api';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { PlaylistService } from 'src/app/common/services/playlist.service';
import {FormsModule} from "@angular/forms";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-add-playlist-modal',
  templateUrl: './add-playlist-modal.component.html',
  styleUrls: ['./add-playlist-modal.component.scss'],
  imports: [
    FormsModule,
    MatSlideToggle,
    MatCheckbox,
    MatFormFieldModule,
    MatCardContent,
    MatCardTitle,
    MatCard,
    MatCardHeader,
    MatIconModule,
    MatButton,
    MatInput
  ],
  standalone: true
})
export class AddPlaylistModalComponent implements OnInit {
  @Input() showModal = false;
  @Output() showModalChange = new EventEmitter<boolean>();
  @Input() searchResults: TitleView[] | null = [];

  resultsWithCheck: any;
  playlistName = '';
  description = '';
  cover: any | null = null;
  showToggleVisibility = false;
  isVisible = false;

  constructor(
    private playlistService: PlaylistService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.userRole === UserViewRoleEnum.LABEL) {
      this.showToggleVisibility = true;
    }
    console.log('labelid', this.authenticationService.labelId);
  }

  ngOnChanges(): void {
    this.resultsWithCheck = this.searchResults?.map((result) => ({
      id: result.id,
      name: result.name,
      checked: false,
    }));
  }

  closeModal() {
    this.showModalChange.emit(false);
  }

  setFileData(files: FileList | null) {
    if (files) {
      this.cover = files[0];
    }
  }

  async createPlaylist() {
    const titles = this.resultsWithCheck
      .filter((result: any) => result.checked)
      .map((filteredResult: any) => filteredResult.id);

    const reader = new FileReader();

    reader.readAsDataURL(this.cover);

    reader.onload = async () => {
      if (this.authenticationService.userRole === UserViewRoleEnum.LABEL) {
        const labelController = new LabelControllerApi();

        const labels = await labelController.getLabel({
          labelId: this.authenticationService.labelId || 0,
        });

        await this.playlistService.createPublicPlaylist({
          titles: titles,
          playlist: {
            visible: this.isVisible,
            label: labels.data,
            name: this.playlistName,
            // @ts-ignore
            previewPicture: reader.result.split(',')[1],
            text: this.description,
          },
        });
      } else {
        const playlist: PrivatePlaylistCreateDTO = {
          playlist: {
            name: this.playlistName,
            text: this.description,
            // @ts-ignore
            previewPicture: reader.result.split(',')[1],
            user: this.authenticationService.user,
          },
          titles: titles,
        };
        await this.playlistService.createPrivatePlaylist(playlist);
      }

      this.closeModal();
    };
  }
}
