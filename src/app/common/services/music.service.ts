import { Injectable } from '@angular/core';

import {
  AudioControllerApi,
  AudioView,
  TitleControllerApi,
  TitleControllerApiSearchTitlesRequest,
  TitleUploadDto,
  TitleView,
} from 'src/api';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  titleController = new TitleControllerApi();
  audioController = new AudioControllerApi();

  async getAllTitles(): Promise<TitleView[] | null> {
    try {
      const response = await this.titleController.getTitles();
      if (response.data) {
        return response.data;
      }
      return null;
    } catch (e) {
      console.error('[music-service]', e);
    }
    return null;
  }

  async downloadSong(audioId: string): Promise<any | null> {
    try {
      const response = await this.audioController.getAudioFile(
        { audioId },
        { responseType: 'blob' }
      );

      if (response.data) {
        return response.data;
      }
    } catch (e) {
      console.error('[music-service]', e);
    }
    return null;
  }

  async searchTitle(searchQuery: TitleControllerApiSearchTitlesRequest) {
    try {
      const response = await this.titleController.searchTitles({
        keyword: searchQuery.keyword,
        genre: searchQuery.genre,
        instrument: searchQuery.instrument,
        mood: searchQuery.mood,
        tempo: searchQuery.tempo,
      });

      if (response.data) {
        return response.data;
      }
    } catch (e) {
      console.error('[music-service]', e);
    }
    return null;
  }

  async createTitle(title: TitleUploadDto) {
    try {
      await this.titleController.uploadTitle({ titleUploadDto: title });
    } catch (e) {
      console.error('[music-service]', e);
    }
    return null;
  }
}
