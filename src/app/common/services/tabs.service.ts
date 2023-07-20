import { Injectable } from '@angular/core';

import {
  ArtistControllerApi,
  GenreControllerApi,
  InstrumentControllerApi,
  MoodControllerApi,
  MoodView,
} from '../../../api';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  moodController = new MoodControllerApi()
  genreController = new GenreControllerApi()
  instrumentController = new InstrumentControllerApi()
  artistController = new ArtistControllerApi()

  async getMoods(): Promise<MoodView[] | null> {
    try {
      const response = await this.moodController.getMoods()

      if (response.data) {
        return response.data
      }
      return null

    } catch (e) {
      console.error("[tabs-service]: error ", e)
    }
    return null
  }

  async getGenres() {
    try {
      const response = await this.genreController.getGenres()

      if (response.data) {
        return response.data
      }

    } catch (e) {
      console.error("[tabs-service]: error ", e)
    }
    return null
  } 
  
  async getInstruments() {
    try {
      const response = await this.instrumentController.getInstruments()

      if (response.data) {
        return response.data
      }

    } catch (e) {
      console.error("[tabs-service]: error ", e)
    }
    return null
  } 
  
  async getArtists() {
    try {
      const response = await this.artistController.getArtists()

      if (response.data) {
        return response.data
      }

    } catch (e) {
      console.error("[tabs-service]: error ", e)
    }
    return null
  }

  constructor() { }
}
