import '@testing-library/jest-dom/vitest';
import {render, screen, waitFor} from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import {provideNoopAnimations} from '@angular/platform-browser/animations';
import {provideRouter, Router} from '@angular/router';
import {TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {vi, describe, it, expect} from 'vitest';
import {provideNativeDateAdapter} from '@angular/material/core';

import {HomeComponent} from './home.component';

import {AuthenticationService} from '../common/services/authentication.service';


class AuthStub {
  userRole: any = -1;
  user: any = {};
  labelId = 0
}


class DummyCmp {
}

async function setup(auth = new AuthStub()) {
  const r = await render(HomeComponent, {
    providers: [
      provideNoopAnimations(),
      provideRouter([
        {path: '', component: DummyCmp},
        {path: 'login', component: DummyCmp},
      ]),
      provideNativeDateAdapter(),                       // fixes the DateAdapter error
      {provide: AuthenticationService, useValue: auth},
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], // don’t instantiate <app-overview>/<app-add-song>
  });

  const router = TestBed.inject(Router);
  return {...r, auth, router};
}

describe('HomeComponent', () => {
  it('renders the toolbar title', async () => {
    await setup();
    expect(screen.getByText(/music storage/i)).toBeInTheDocument();
  });

  it('does NOT show "Neuer Song" tab for non-LABEL users', async () => {
    await setup(); // default auth.userRole = -1
    expect(screen.queryByRole('tab', {name: /neuer song/i})).not.toBeInTheDocument();
  });

  it('shows "Neuer Song" tab for LABEL users', async () => {
    const {fixture, auth} = await setup();

    // Use the enum exposed by the component if present
    const cmp = fixture.componentInstance as any;
    const labelValue =
      cmp?.UserRole?.LABEL; // fallback to 1 if enum not exposed

    auth.userRole = labelValue;
    fixture.detectChanges();

    expect(screen.getByRole('tab', {name: /neuer song/i})).toBeInTheDocument();
  });

  it('clicking "Logout" calls component.logout()', async () => {
    const {fixture} = await setup();
    const cmp = fixture.componentInstance as HomeComponent;
    const spy = vi.spyOn(cmp, 'logout');

    const logoutBtn = screen.getByRole('button', {name: /logout/i});
    await userEvent.click(logoutBtn);

    expect(spy).toHaveBeenCalled();
  });

  it('clicking "Logout" also navigates to /login (via routerLink)', async () => {
    const {router} = await setup();

    const logoutBtn = screen.getByRole('button', {name: /logout/i});
    await userEvent.click(logoutBtn);

    // RouterLink on the button should trigger navigation
    await waitFor(() => expect(router.url).toMatch(/\/login$/));
  });
});
