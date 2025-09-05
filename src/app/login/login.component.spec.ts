import '@testing-library/jest-dom/vitest';
import {render, screen, waitFor} from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { vi, describe, it, expect } from 'vitest';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../common/services/authentication.service';

class AuthStub {
  user: any = null;
  login = vi.fn(async (u: string, p: string) => { this.user = { name: u }; });
}
class DummyCmp {}

async function setup(auth = new AuthStub()) {
  await render(LoginComponent, {
    providers: [
      provideNoopAnimations(),
      provideRouter([{ path: 'home', component: DummyCmp }]),
      { provide: AuthenticationService, useValue: auth },
    ],
  });

  const nameInput = screen.getByLabelText(/name/i);
  const passInput = screen.getByLabelText(/passwort/i);
  const submit    = screen.getByRole('button', { name: /anmelden/i });

  return { auth, nameInput, passInput, submit };
}

describe('LoginComponent', () => {
  it('disables submit until both fields are valid', async () => {
    const { submit, nameInput, passInput } = await setup();

    // give Angular Forms one tick to mark the form as invalid
    await waitFor(() => expect(submit).toBeDisabled());

    await userEvent.type(nameInput, 'alice');
    await waitFor(() => expect(submit).toBeDisabled()); // still invalid

    await userEvent.type(passInput, 'secret');
    await waitFor(() => expect(submit).toBeEnabled());
  });

});
