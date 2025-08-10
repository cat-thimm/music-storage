import { Injectable } from '@angular/core';

import {
  LabelControllerApi,
  PrivatePlaylistControllerApi,
  PrivatePlaylistCreateDTO,
  PrivatePlaylistView,
  PublicPlaylistControllerApi,
  PublicPlaylistControllerApiCreatePublicPlaylistRequest,
  PublicPlaylistCreateDTO,
  PublicPlaylistView,
  UserControllerApi,
} from 'src/api';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  privatePlaylistController = new PrivatePlaylistControllerApi();
  publicPlaylistController = new PublicPlaylistControllerApi();

  async getPrivatePlaylists(
      username: string | undefined
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

  async getPublicPlaylist(
    labelId?: number
  ): Promise<PublicPlaylistView[] | null> {
    try {
      const response = await this.publicPlaylistController.getPublicPlaylists({
        labelId,
      });
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.error('[playlist-service] Error ', error);
    }
    return null;
  }

  async createPublicPlaylist(playlist: PublicPlaylistCreateDTO) {
    try {
      const response = await this.publicPlaylistController.createPublicPlaylist(
        { publicPlaylistCreateDTO: playlist }
      );
    } catch (error) {
      console.error('[playlist-service] Error ', error);
    }
  }

  constructor() {}
}
