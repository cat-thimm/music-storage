import { Injectable } from '@angular/core';

import {
  AlbumControllerApi,
  AlbumView,
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
  albumController = new AlbumControllerApi();

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

  async downloadSong(audioId: number): Promise<any | null> {
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

  async createAlbum(
    image: any,
    labelId: number,
    name: string,
    presskitId: number,
    text: string,
    year: string,
    titles: number[]
  ) {
    try {
      const album = await this.albumController.postAlbum({
        file: image,
        labelId,
        name,
        presskitId,
        text,
        year,
      });

      if (album.data && album.data.id) {
        titles.forEach(async (title) => {
          await this.albumController.addTitleToAlbum({
            titleId: title,
            albumId: album.data.id || 0,
          });
        });
      }
    } catch (e) {
      console.error('[music-service]', e);
    }
    return null;
  }
}
