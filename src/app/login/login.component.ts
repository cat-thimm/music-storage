import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthenticationService} from "../common/services/authentication.service";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../styles.scss'],
  imports: [
    RouterLink,
    MatCardActions,
    MatFormFieldModule,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    FormsModule,
    MatInput,
    MatButton,

  ],
  standalone: true
})
export class LoginComponent {
  private router = inject(Router)
  private authenticationService: AuthenticationService = inject(AuthenticationService)


  username = '';
  password = '';

  async loginUser(username: string, password: string) {
    try {
      await this.authenticationService.login(username, password)

      if (this.authenticationService.user) {

        this.router.navigate(['/home']);
      } else {
        alert("User was not found")

      }

    } catch (e) {
      console.log("NO USER FOUND", e)
    }
  }
}
