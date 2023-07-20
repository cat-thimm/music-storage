import { Injectable } from '@angular/core';
import {
  PrivatePlaylistControllerApi,
  PrivatePlaylistCreateDTO,
  PrivatePlaylistView,
} from 'src/api';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  privatePlaylistController = new PrivatePlaylistControllerApi();

  async getPrivatePlaylists(
    username: string
  ): Promise<PrivatePlaylistView[] | null> {
    try {
      const response = await this.privatePlaylistController.getPrivatePlaylists(
        {
          username,
        }
      );

      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.error('[playlist-service] Error ', error);
    }
    return null;
  }

  async createPrivatePlaylist(playlistRequest: PrivatePlaylistCreateDTO) {
    try {
      await this.privatePlaylistController.createPrivatePlaylist({
        privatePlaylistCreateDTO: playlistRequest,
      });
    } catch (e) {
      console.error('[playlist-service] Error ', e);
    }
  }

  constructor() {}
}
