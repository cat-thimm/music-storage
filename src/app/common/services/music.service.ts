import {Injectable} from '@angular/core';
import {Title} from "../models/title";
import {Playlist} from "../models/playlist";

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  dropdownGenre = ['Rock', 'Pop', 'Indie']
  dropdownArtist = ['Von wegen Lisbeth', 'Alligatoah']
  dropdownMood = ['Sad', 'Happy']
  dropdownInstrument = ['Guitar', 'Piano']
  dropdownTempo = ['Fast', 'Slow']

  searchResults: Title[] = [
    {
      id: 1,
      name: "99 Luftballons",
      bpm: 120,
      gemaNr: '123',
      visible: true,
      releaseDate: new Date(),
      label: {id: 1, name: 'Nena', email: 'mail@mail.de', biography: 'LOL'}
    },{
      id: 2,
      name: "L.O.V.E",
      bpm: 120,
      gemaNr: '123',
      visible: true,
      releaseDate: new Date(),
      label: {id: 1, name: 'Leoniden', email: 'mail@mail.de', biography: 'LOL'}
    },{
      id: 3,
      name: "Kids",
      bpm: 120,
      gemaNr: '123',
      visible: true,
      releaseDate: new Date(),
      label: {id: 1, name: 'Leoniden', email: 'mail@mail.de', biography: 'LOL'}
    },{
      id: 4,
      name: "Auf Eis",
      bpm: 120,
      gemaNr: '123',
      visible: true,
      releaseDate: new Date(),
      label: {id: 1, name: 'Von wegen Lisbeth', email: 'mail@mail.de', biography: 'LOL'}
    },{
      id: 5,
      name: "Meine Kneipe",
      bpm: 120,
      gemaNr: '123',
      visible: true,
      releaseDate: new Date(),
      label: {id: 1, name: 'Von wegen Lisbeth', email: 'mail@mail.de', biography: 'LOL'}
    },{
      id: 6,
      name: "Elon",
      bpm: 120,
      gemaNr: '123',
      visible: true,
      releaseDate: new Date(),
      label: {id: 1, name: 'Von wegen Lisbeth', email: 'mail@mail.de', biography: 'LOL'}
    },{
      id: 7,
      name: "Ich bin ich ",
      bpm: 120,
      gemaNr: '123',
      visible: true,
      releaseDate: new Date(),
      label: {id: 1, name: 'Rosenstolz', email: 'mail@mail.de', biography: 'LOL'}
    },{
      id: 8,
      name: "Hold the Line",
      bpm: 120,
      gemaNr: '123',
      visible: true,
      releaseDate: new Date(),
      label: {id: 1, name: 'Toto', email: 'mail@mail.de', biography: 'LOL'}
    },{
      id: 9,
      name: "Highway to Hell",
      bpm: 120,
      gemaNr: '123',
      visible: true,
      releaseDate: new Date(),
      label: {id: 1, name: 'ACDC', email: 'mail@mail.de', biography: 'LOL'}
    },{
      id: 10,
      name: "Thunderstruck",
      bpm: 120,
      gemaNr: '123',
      visible: true,
      releaseDate: new Date(),
      label: {id: 1, name: 'ACDC', email: 'mail@mail.de', biography: 'LOL'}
    },{
      id: 11,
      name: "Wildberry Lillet",
      bpm: 120,
      gemaNr: '123',
      visible: true,
      releaseDate: new Date(),
      label: {id: 1, name: 'Nina Chuba', email: 'mail@mail.de', biography: 'LOL'}
    },
  ]

  privatePlaylists: Playlist[] = [{
    id: 1,
    name: 'My Favourite Songs',
    titles: [this.searchResults[0], this.searchResults[1]]
  },
    {
      id: 2,
      name: 'Summer Vibes',
      titles: [this.searchResults[0], this.searchResults[1]]
    },
    {
      id: 3,
      name: 'Study Music',
      titles: [this.searchResults[0], this.searchResults[1]]
    },{
      id: 3,
      name: 'Study Music',
      titles: [this.searchResults[0], this.searchResults[1]]
    }]
  publicPlaylists = []

  constructor() {
  }
}
