import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthenticationService } from '../common/services/authentication.service';

// Angular Material (standalone imports)
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../styles.scss'],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    RouterLink,

    // Material
    MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions,
    MatFormFieldModule,
    MatInput,
    MatButton,
  ],
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthenticationService);

  username = '';
  password = '';

  readonly loading = signal(false);

  async loginUser(): Promise<void> {
    if (!this.username || !this.password) return;

    this.loading.set(true);
    try {
      await this.auth.login(this.username, this.password);

      if (this.auth.user) {
        await this.router.navigate(['/home']);
      } else {
        alert('User was not found');
      }
    } catch (err) {
      console.error('Login failed', err);
      alert('Login fehlgeschlagen.');
    } finally {
      this.loading.set(false);
    }
  }
}
