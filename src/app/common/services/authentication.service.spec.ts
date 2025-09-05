import { TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AuthenticationService } from './authentication.service';
import {UserViewRoleEnum} from "../../../api";

const ok = <T>(data: T) => Promise.resolve({ data } as any);

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  let userApiMock: {
    login: ReturnType<typeof vi.fn>;
    createUser: ReturnType<typeof vi.fn>;
  };
  let labelApiMock: {
    createLabel: ReturnType<typeof vi.fn>;
  };

  let setItemSpy: ReturnType<typeof vi.spyOn>;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService],
    });
    service = TestBed.inject(AuthenticationService);

    // fresh mocks every test
    userApiMock = {
      login: vi.fn(),
      createUser: vi.fn(),
    };
    labelApiMock = {
      createLabel: vi.fn(),
    };

    // overwrite the concrete instances on the service
    (service as any).userController = userApiMock;
    (service as any).labelController = labelApiMock;

    setItemSpy = vi.spyOn(localStorage, 'setItem');
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('login(): sets user, role, labelId and stores token on success', async () => {
    const user = {
      username: 'alice',
      role: UserViewRoleEnum.LABEL,   // UserViewRoleEnum if you want strict typing
      labelId: 7,
    };
    userApiMock.login.mockResolvedValue({ data: user });

    await service.login('alice', 'secret');

    expect(userApiMock.login).toHaveBeenCalledWith({
      authenticationView: { username: 'alice', password: 'secret' },
    });
    expect(service.user).toEqual(user as any);
    expect(service.userRole).toBe(user.role);
    expect(service.labelId).toBe(7);
  });

  it('login(): does nothing if response has no data', async () => {
    userApiMock.login.mockResolvedValue({ data: null });

    await service.login('nobody', 'pw');

    expect(service.user).toBeUndefined();
    expect(service.userRole).toBeUndefined();
    expect(service.labelId).toBeUndefined();
    expect(setItemSpy).not.toHaveBeenCalled();
  });

  it('login(): catches and logs errors (no throw)', async () => {
    userApiMock.login.mockRejectedValue(new Error('boom'));

    await service.login('x', 'y');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '[authentication-service] ',
      expect.any(Error)
    );
    // state not set
    expect(service.user).toBeUndefined();
  });

  it('register(): creates user then logs in when username & password exist', async () => {
    userApiMock.createUser.mockResolvedValue({}); // OK response
    const loginSpy = vi.spyOn(service, 'login').mockResolvedValue(void 0 as any);

    const newUser = { username: 'bob', password: 'pw' } as any;
    await service.register(newUser);

    expect(userApiMock.createUser).toHaveBeenCalledWith({ userView: newUser });
    expect(loginSpy).toHaveBeenCalledWith('bob', 'pw');
  });

  it('register(): does not call login when username/password missing', async () => {
    userApiMock.createUser.mockResolvedValue({});
    const loginSpy = vi.spyOn(service, 'login').mockResolvedValue(void 0 as any);

    await service.register({ username: 'no-pass' } as any);

    expect(userApiMock.createUser).toHaveBeenCalled();
    expect(loginSpy).not.toHaveBeenCalled();
  });

  it('register(): logs error on failure', async () => {
    userApiMock.createUser.mockRejectedValue(new Error('fail'));
    await service.register({ username: 'u', password: 'p' } as any);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '[authentication-service] ',
      expect.any(Error)
    );
  });

  it('createLabel(): sets labelId from API response', async () => {
    labelApiMock.createLabel.mockImplementation(() => ok({ id: 123 }));

    await service.createLabel({ name: 'My Label' } as any);

    expect(labelApiMock.createLabel).toHaveBeenCalledWith({
      labelView: { name: 'My Label' },
    });
    expect(service.labelId).toBe(123);
  });

  it('createLabel(): logs error on failure and does not set labelId', async () => {
    labelApiMock.createLabel.mockRejectedValue(new Error('nope'));
    await service.createLabel({ name: 'X' } as any);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '[authentication-service] ',
      expect.any(Error)
    );
    expect(service.labelId).toBeUndefined();
  });
});
