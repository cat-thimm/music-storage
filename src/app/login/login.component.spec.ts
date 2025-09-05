import '@testing-library/jest-dom/vitest';
import {render, screen, waitFor} from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { vi, describe, it, expect } from 'vitest';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../common/services/authentication.service';
import {provideZonelessChangeDetection} from "@angular/core";

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
      provideZonelessChangeDetection(),
      { provide: AuthenticationService, useValue: auth },
    ],
  });

  const nameInput = screen.getByLabelText(/name/i);
  const passInput = screen.getByLabelText(/passwort/i);
  const submit    = screen.getByRole('button', { name: /anmelden/i });

  return { auth, nameInput, passInput, submit };
}

describe('LoginComponent', () => {
  beforeAll(async () => {
    try {
      if (typeof process !== 'undefined' && process.versions?.node) {
        const { readFileSync } = await import('node:fs');
        const { ɵresolveComponentResources: resolveComponentResources } =
          await import('@angular/core');

        await resolveComponentResources(url =>
          Promise.resolve(readFileSync(new URL(url, import.meta.url), 'utf-8'))
        );
      }
    } catch {
      return;
    }
  });

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
