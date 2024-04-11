'use strict';

const { RuleTester } = require('eslint');
const noTestingLibraryWithoutCleanup = require('./no-testing-library-without-cleanup.js');

const ruleTester = new RuleTester({
  // Must use at least ecmaVersion 2015 because
  // that's when `ES6 Modules` were introduced.
  languageOptions: { ecmaVersion: 2015, sourceType: 'module' },
});

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  'no-testing-library-without-cleanup', // rule name
  noTestingLibraryWithoutCleanup, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        name: 'when using a cleanup function in a file that imports from the testing library scope.',
        code: `
        import { cleanup } from '@testing-library/react';
        cleanup();
        `,
      },
      {
        name: 'when using a cleanup function from an object in a file that imports from the testing library scope.',
        code: `
        import rtl from '@testing-library/react';
        rtl.cleanup();
        `,
      },
      {
        name: 'when using a cleanup function in a file that imports from the testing library scope without the need to import the cleanup.',
        code: `
          import userEvent from '@testing-library/user-event';
          cleanup();
          `,
      },
      {
        name: 'when using a cleanup function in a file that imports from the testing library scope with commonjs.',
        code: `
          const rtl = require('@testing-library/react');

          rtl.cleanup();
        `,
      },
      {
        name: 'when no cleanup function is invoked because there are no imports from the testing library scope.',
        code: `import defaultName from 'my-module';`,
      },
      {
        name: 'when no cleanup function is invoked because there are no imports from the testing library scope with commonjs.',
        code: `require('my-module');`,
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        name: 'when importing from the testing library scope but not invoking the cleanup function.',
        code: `
          import { renderHook } from '@testing-library/react';
          renderHook();
          `,
        errors: 1,
      },
      {
        name: 'when importing the cleanup function from the testing library scope but not invoking it.',
        code: `
        import { cleanup } from '@testing-library/react';
        import { expect, test } from 'vitest';
   
        test('example', () => {});
        `,
        errors: 1,
      },
      {
        name: 'when no cleanup function is invoked when importing from the testing library scope with commonjs.',
        code: `
          const rtl = require('@testing-library/react');

          rtl.render();
        `,
        errors: 1,
      },
    ],
  }
);
