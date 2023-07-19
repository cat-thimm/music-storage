import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from "../common/services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../styles.scss'],
})
export class LoginComponent {
  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  username = '';
  password = '';

  async loginUser(username: string, password: string) {
    await this.authenticationService.login(username, password)

    if (this.authenticationService.user) {

      this.router.navigate(['/home']);
    } else {
      console.log("NO USER FOUND")
    }
  }
}
