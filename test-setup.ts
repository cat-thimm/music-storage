import { NgModule } from '@angular/core';
import {
  ɵgetCleanupHook as getCleanupHook,
  getTestBed
} from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting
} from '@angular/platform-browser/testing';
import { afterEach, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';


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


