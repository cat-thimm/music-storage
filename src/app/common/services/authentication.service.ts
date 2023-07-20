import { Injectable } from '@angular/core';
import {
  LabelControllerApi,
  LabelView,
  UserControllerApi,
  UserView,
  UserViewRoleEnum,
} from '../../../api';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userController: UserControllerApi = new UserControllerApi();
  labelController: LabelControllerApi = new LabelControllerApi();
  user?: UserView = undefined;
  userRole?: UserViewRoleEnum = undefined;
  labelId?: number;

  async login(username: string, password: string) {
    try {
      const response = await this.userController.login({
        authenticationView: { username, password },
      });

      if (response.data) {
        this.user = response.data;
        this.userRole = response.data.role;
        this.labelId = response.data.labelId;
        localStorage.setItem('token', btoa(`${username}:${password}`));
      }
    } catch (e) {
      console.error('[authentication-service] ', e);
    }
  }

  async register(user: UserView) {
    try {
      await this.userController.createUser({ userView: user });
      if (user.username && user.password)
        await this.login(user.username, user.password);
    } catch (e) {
      console.error('[authentication-service] ', e);
    }
  }

  async createLabel(label: LabelView) {
    try {
      const response = await this.labelController.createLabel({
        labelView: label,
      });
      if (response.data) {
        this.labelId = response.data.id;
      }
    } catch (e) {
      console.error('[authentication-service] ', e);
    }
  }

  constructor() {}
}
