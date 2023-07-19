import { Injectable } from '@angular/core';
import { Title } from '../models/title';
import { Playlist } from '../models/playlist';
import { TitleControllerApi, TitleView } from 'src/api';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  titleController = new TitleControllerApi();

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
}
