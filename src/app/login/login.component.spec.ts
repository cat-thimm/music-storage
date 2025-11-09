import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { provideRouter } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../common/services/authentication.service';

class AuthStub {
  user: { name: string } | null = null;
  login = jest.fn(async (u: string, p: string) => {
    this.user = { name: u };
  });
}

async function setup() {
  const auth = new AuthStub();

  await render(LoginComponent, {
    providers: [
      provideRouter([
        { path: 'home', component: class Dummy {} },
        { path: 'register', component: class Dummy {} },
      ]),
      { provide: AuthenticationService, useValue: auth },
    ],
  });

  const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
  const passInput = screen.getByLabelText(/passwort/i) as HTMLInputElement;
  const submit = screen.getByRole('button', { name: /anmelden/i }) as HTMLButtonElement;

  return { auth, nameInput, passInput, submit };
}

describe('LoginComponent', () => {
  it('focuses the name input when tabbing in', async () => {
    const { nameInput } = await setup();

    await userEvent.tab();

    await waitFor(() => expect(nameInput).toHaveFocus());
  });

  it('initially disables the login button', async () => {
    const { submit } = await setup();

    await waitFor(() => expect(submit).toBeDisabled());
  });


  it('enables login button if username and password are set', async () => {
    const { nameInput, passInput, submit } = await setup();

    // initial: invalid -> disabled (wartet auf ngForm-Status)
    await waitFor(() => expect(submit).toBeDisabled());

    // nur Name: weiterhin disabled
    await userEvent.type(nameInput, 'alice');
    await waitFor(() => expect(submit).toBeDisabled());

    // Passwort dazu: enabled
    await userEvent.type(passInput, 'secret');
    await waitFor(() => expect(submit).toBeEnabled());
  });
});
