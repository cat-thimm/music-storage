import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { DropdownOption } from '../../common/models/dropdown-option';
import { ArtistView, GenreView, InstrumentView, MoodView } from 'src/api';
import { MusicService } from 'src/app/common/services/music.service';
import { AuthenticationService } from 'src/app/common/services/authentication.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss'],
})
export class AddSongComponent {
  @Input() artists: ArtistView[] | null = null;
  @Input() genres: GenreView[] | null = null;
  @Input() moods: MoodView[] | null = null;
  @Input() instruments: InstrumentView[] | null = null;

  songMetaDataGroup = this._formBuilder.group({
    songName: ['', Validators.required],
    gemaNr: ['', Validators.required],
    visible: [false, Validators.required],
    releaseDate: ['', Validators.required],
    file: ['', Validators.required],
  });
  tagGroup = this._formBuilder.group({
    genre: [[''], Validators.required],
    artist: [[''], Validators.required],
    instrument: [[''], Validators.required],
    tempo: [0, Validators.required],
    mood: [[''], Validators.required],
  });
  previewGroup = this._formBuilder.group({
    previewImage: [null, Validators.required],
  });

  wavFile: any = null;
  cover: any = null;

  setSongFileData(files: FileList | null) {
    if (files) {
      this.wavFile = files[0];
    }
  }

  setSongImageData(files: FileList | null) {
    if (files) {
      this.cover = files[0];
    }
  }

  checkTags() {
    console.log(this.tagGroup);
  }

  async submitData(stepper: MatStepper) {
    const artists = this.tagGroup.get('artist')?.value;
    const tempo = this.tagGroup.get('tempo')?.value;
    const instrument = this.tagGroup.get('instrument')?.value;
    const mood = this.tagGroup.get('mood')?.value;
    const genre = this.tagGroup.get('genre')?.value;

    const gemaNr = this.songMetaDataGroup.get('gemaNr')?.value;
    const songName = this.songMetaDataGroup.get('songName')?.value;
    const visible = this.songMetaDataGroup.get('visible')?.value;
    const releaseDate = this.songMetaDataGroup.get('releaseDate')?.value;

    const labelId = this.authenticationService.labelId;

    const imageFile = await this.blobToBase64(this.cover);
    console.log('>> img', imageFile);
    const wav = await this.blobToBase64(this.wavFile);
    console.log('>> wav', wav);

    if (
      artists &&
      tempo &&
      genre &&
      instrument &&
      mood &&
      gemaNr &&
      labelId &&
      songName &&
      visible &&
      releaseDate &&
      imageFile &&
      wav
    )
      await this.musicService.createTitle({
        artists: artists,
        bpm: tempo,
        instruments: instrument,
        moods: mood,
        genres: genre,
        cover: imageFile.split(',')[1] || '',
        gemaNr: gemaNr,
        label_id: labelId,
        name: songName,
        releaseDate: releaseDate,
        visible: visible,
        wav: wav.split(',')[1] || '',
      });

    stepper.reset();
  }

  blobToBase64(blob: any): any {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
    });
  }

  constructor(
    private _formBuilder: FormBuilder,
    private musicService: MusicService,
    private authenticationService: AuthenticationService
  ) {}
}
