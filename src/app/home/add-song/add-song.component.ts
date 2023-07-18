import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { DropdownOption } from '../../common/models/dropdown-option';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss'],
})
export class AddSongComponent {
  songMetaDataGroup = this._formBuilder.group({
    songName: ['', Validators.required],
    file: ['', Validators.required],
  });
  tagGroup = this._formBuilder.group({
    genre: ['', Validators.required],
    artist: ['', Validators.required],
    instruments: ['', Validators.required],
    tempo: ['', Validators.required],
    mood: ['', Validators.required],
  });

  wavFile = null;
  cover = null;

  artists: DropdownOption[] = [
    { id: 1, selected: false, value: 'Von wegen Lisbeth' },
  ];
  instruments = ['Gitarre', 'Klavier'];
  tempo = ['langsam', 'schnell'];
  mood = ['traurig', 'cool'];

  setFileData(files: FileList | null, fileToStore: File | null) {
    if (files) {
      fileToStore = files[0];
    }
  }

  submitData(stepper: MatStepper) {}

  constructor(private _formBuilder: FormBuilder) {}
}
