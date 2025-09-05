import { NgModule } from '@angular/core';
import {
  ɵgetCleanupHook as getCleanupHook,
  getTestBed
} from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting
} from '@angular/platform-browser/testing';
import { afterEach, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

vi.mock('axios', () => {
  return {
    default: {
      post: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
      put: vi.fn(),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(),
          eject: vi.fn(),
        },
        response: {
          use: vi.fn(),
          eject: vi.fn(),
        },
      },
    },
  };
});

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const providers: NgModule['providers'] = [];

beforeEach(getCleanupHook(false));
afterEach(getCleanupHook(true));

@NgModule({ providers })
export class TestModule {}

getTestBed().initTestEnvironment(
  [BrowserTestingModule, TestModule],
  platformBrowserTesting(),
  {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true
  }
);




