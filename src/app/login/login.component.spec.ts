import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { provideRouter, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { vi, describe, it, expect } from 'vitest';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../common/services/authentication.service';

class AuthStub {
  user: any = null;
  login = vi.fn(async (u: string, p: string) => {
    this.user = { name: u };
  });
}

async function setup(auth = new AuthStub()) {
  await render(LoginComponent, {
    providers: [
      // provideRouter([{ path: 'home', component: LoginComponent } as any]),
      { provide: AuthenticationService, useValue: auth },
    ],
  });

  const router = TestBed.inject(Router);
  const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true as any);

  const nameInput = screen.getByLabelText(/name/i);
  const passInput = screen.getByLabelText(/passwort/i);
  const submit   = screen.getByRole('button', { name: /anmelden/i });

  return { auth, router, navigateSpy, nameInput, passInput, submit };
}

describe('LoginComponent', () => {
  it('disables submit until both fields are valid', async () => {
    const { submit, nameInput, passInput } = await setup();
    expect(submit).toBeDisabled();

    await userEvent.type(nameInput, 'alice');
    expect(submit).toBeDisabled(); // password still empty

    await userEvent.type(passInput, 'secret');
    expect(submit).toBeEnabled();
  });

  it('calls auth.login and navigates to /home on success', async () => {
    const { auth, navigateSpy, nameInput, passInput, submit } = await setup();

    await userEvent.type(nameInput, 'bob');
    await userEvent.type(passInput, 'pw');
    await userEvent.click(submit);

    expect(auth.login).toHaveBeenCalledWith('bob', 'pw');
    await waitFor(() =>
      expect(navigateSpy).toHaveBeenCalledWith(['/home'])
    );
  });

  it('shows "User was not found" if auth.user stays falsy', async () => {
    const auth = new AuthStub();
    auth.login = vi.fn(async () => { auth.user = null; });
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const { navigateSpy, nameInput, passInput, submit } = await setup(auth);
    await userEvent.type(nameInput, 'charlie');
    await userEvent.type(passInput, 'pw');
    await userEvent.click(submit);

    await waitFor(() => expect(alertSpy).toHaveBeenCalledWith('User was not found'));
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('shows error alert on rejection and resets loading', async () => {
    const auth = new AuthStub();
    auth.login = vi.fn().mockRejectedValue(new Error('boom'));
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { nameInput, passInput, submit } = await setup(auth);

    await userEvent.type(nameInput, 'dana');
    await userEvent.type(passInput, 'pw');
    await userEvent.click(submit);

    await waitFor(() => expect(alertSpy).toHaveBeenCalledWith('Login fehlgeschlagen.'));
    expect(errorSpy).toHaveBeenCalled();
    // (Optional) ensure button is enabled again after failure:
    await waitFor(() => expect(submit).toBeEnabled());
  });

  it('keeps submit disabled while request is in flight (loading signal)', async () => {
    let resolve!: () => void;
    const auth = new AuthStub();
    auth.login = vi.fn(() => new Promise<void>(r => { resolve = () => { auth.user = { name: 'x' }; r(); }; }));

    const { nameInput, passInput, submit, /* navigateSpy */ } = await setup(auth);
    await userEvent.type(nameInput, 'erin');
    await userEvent.type(passInput, 'pw');

    expect(submit).toBeEnabled();
    await userEvent.click(submit);
    // now loading() should be true => button disabled
    expect(submit).toBeDisabled();

    resolve();
    await waitFor(() => expect(submit).toBeEnabled());
  });

  it('renders a "Registrieren" link', async () => {
    await setup();
    // Smoke check that link is present (navigation is covered elsewhere)
    expect(screen.getByRole('link', { name: /registrieren/i })).toBeInTheDocument();
  });
});
