import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../styles.scss']
})
export class LoginComponent {
  constructor(private router: Router) {
  }
  email = '';
  password = '';

  loginUser() {
      this.router.navigate(['/home'])
  }
}
