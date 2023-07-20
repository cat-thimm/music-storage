import { Injectable } from '@angular/core';
import { PrivatePlaylistControllerApi, PrivatePlaylistView } from 'src/api';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  privatePlaylistController = new PrivatePlaylistControllerApi();

  async getPrivatePlaylists(username: string): Promise<PrivatePlaylistView[] | null> {
    try {
      const response = await this.privatePlaylistController.getPrivatePlaylists({
        username,
      })
      
      if(response.data) {
        return response.data
      }
    } catch (error) {
      console.error('[playlist-service] Error ', error);
    }
    return null
  }

  constructor() {}
}
