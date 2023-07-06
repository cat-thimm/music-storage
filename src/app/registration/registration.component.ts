import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss', '../../styles.scss']
})
export class RegistrationComponent {
  name = '';
  email = '';
  password = '';
}
