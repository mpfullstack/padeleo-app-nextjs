// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Polyfill "window.fetch" used in the React component.
import 'whatwg-fetch';

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

jest.mock('next/router', () => require('next-router-mock'));

jest.mock('next/config', () => () => ({
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    appTitle: 'Test App',
  },
}));