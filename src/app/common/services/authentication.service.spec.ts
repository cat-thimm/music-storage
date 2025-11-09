import {TestBed} from '@angular/core/testing';

import {AuthenticationService} from './authentication.service';
import {UserViewRoleEnum} from "../../../api";

const ok = <T>(data: T) => Promise.resolve({data} as any);

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  let userApiMock: {
    login: ReturnType<typeof jest.fn>;
    createUser: ReturnType<typeof jest.fn>;
  };
  let labelApiMock: {
    createLabel: ReturnType<typeof jest.fn>;
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService],
    });
    service = TestBed.inject(AuthenticationService);

    // fresh mocks every test
    userApiMock = {
      login: jest.fn(),
      createUser: jest.fn(),
    };
    labelApiMock = {
      createLabel: jest.fn(),
    };

    // overwrite the concrete instances on the service
    (service as any).userController = userApiMock;
    (service as any).labelController = labelApiMock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('login(): sets user, role, labelId and stores token on success', async () => {
    const user = {
      username: 'alice',
      role: UserViewRoleEnum.LABEL,   // UserViewRoleEnum if you want strict typing
      labelId: 7,
    };
    userApiMock.login.mockReturnValue({data: user});

    await service.login('alice', 'secret');

    expect(userApiMock.login).toHaveBeenCalledWith({
      authenticationView: {username: 'alice', password: 'secret'},
    });
    expect(service.user).toEqual(user as any);
    expect(service.userRole).toBe(user.role);
    expect(service.labelId).toBe(7);
  });

  it('login(): does nothing if response has no data', async () => {
    userApiMock.login.mockReturnValue({data: null});

    await service.login('nobody', 'pw');

    expect(service.user).toBeUndefined();
    expect(service.userRole).toBeUndefined();
    expect(service.labelId).toBeUndefined();
  });

  it('register(): creates user then logs in when username & password exist', async () => {
    userApiMock.createUser.mockReturnValue({}); // OK response
    const loginSpy = jest.spyOn(service, 'login').mockResolvedValue(void 0 as any);

    const newUser = {username: 'bob', password: 'pw'} as any;
    await service.register(newUser);

    expect(userApiMock.createUser).toHaveBeenCalledWith({userView: newUser});
    expect(loginSpy).toHaveBeenCalledWith('bob', 'pw');
  });

  it('register(): does not call login when username/password missing', async () => {
    userApiMock.createUser.mockReturnValue({});
    const loginSpy = jest.spyOn(service, 'login').mockResolvedValue(void 0 as any);

    await service.register({username: 'no-pass'} as any);

    expect(userApiMock.createUser).toHaveBeenCalled();
    expect(loginSpy).not.toHaveBeenCalled();
  });


  it('createLabel(): sets labelId from API response', async () => {
    labelApiMock.createLabel.mockImplementation(() => ok({id: 123}));

    await service.createLabel({name: 'My Label'} as any);

    expect(labelApiMock.createLabel).toHaveBeenCalledWith({
      labelView: {name: 'My Label'},
    });
    expect(service.labelId).toBe(123);
  });
});
