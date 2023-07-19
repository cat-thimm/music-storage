import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {UserViewRoleEnum} from "../../api";

import {AuthenticationService} from "../common/services/authentication.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss', '../../styles.scss']
})
export class RegistrationComponent {
  name = '';
  email = '';
  password = '';
  isLabel = false;
  biography = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  async register() {
    try {
      await this.authenticationService.register({
        username: this.name,
        email: this.email,
        password: this.password,
        role: this.isLabel ? UserViewRoleEnum.LABEL : UserViewRoleEnum.USER
      })

      if (this.isLabel) {
        await this.authenticationService.createLabel({
          name: this.name,
          email: this.email,
          password: this.password,
          biography: this.biography
        }).catch(e => console.log(e))
      }
      this.router.navigate(['/home'])
    } catch (e) {
      console.log("[Registration Component]: Error ", e)
    }

  }
}
