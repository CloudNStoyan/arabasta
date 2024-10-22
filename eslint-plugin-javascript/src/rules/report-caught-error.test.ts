import reportCaughtError from './report-caught-error';
import { RuleTester } from 'eslint';
import { normalizeIndent } from '../test-utils';

const ruleTester = new RuleTester({
  // Must use at least ecmaVersion 2019 because
  // that's when `optional catch binding` was introduced.
  // https://github.com/tc39/proposal-optional-catch-binding
  languageOptions: { ecmaVersion: 2019 },
});

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  'report-caught-error', // rule name
  reportCaughtError, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        name: 'when the first statement of a catch block is the report function call.',
        code: normalizeIndent`
          try {
          } catch (error) {
            console.error(error);
          }
        `,
      },
      {
        name: "when the report function is called with a different error identifier than 'error'.",
        code: normalizeIndent`
          try {
          } catch (err) {
            console.error(err);
          }
        `,
      },
      {
        name: 'when using optional catch binding because the rule ignores the try/catch.',
        code: normalizeIndent`
          try {
          } catch {
            foo();
          }
        `,
      },
      {
        name: "when setting the report function name to 'reportUnknownError'.",
        code: normalizeIndent`
          try {
          } catch (error) {
            reportUnknownError(error);
          }
        `,
        options: [
          {
            reportFunctionName: 'reportUnknownError',
          },
        ],
      },
      {
        name: "when setting the report function name to 'reportUnknownError' and the report function is called with a different error identifier than 'error'.",
        code: normalizeIndent`
          try {
          } catch (err) {
            reportUnknownError(err);
          }
        `,
        options: [
          {
            reportFunctionName: 'reportUnknownError',
          },
        ],
      },
      {
        name: 'when setting the report function name to a very nested and long name.',
        code: normalizeIndent`
          try {
          } catch (error) {
            my.long.report.function.name(error);
          }
        `,
        options: [
          {
            reportFunctionName: 'my.long.report.function.name',
          },
        ],
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        name: 'when the first statement of the catch block is not the report function.',
        code: normalizeIndent`
          try {
          } catch (error) {
            let a = 1;
            console.error(error);
          }
        `,
        errors: [
          {
            messageId: 'firstStatementMustBeFunction',
            suggestions: [
              {
                messageId: 'addReportError',
                output: normalizeIndent`
                try {
                } catch (error) { console.error(error);
                  let a = 1;
                  console.error(error);
                }
              `,
              },
            ],
          },
        ],
      },
      {
        name: 'when the first statement is a function call, but its not the report function.',
        code: normalizeIndent`
          try {
          } catch(error) {
            foo(error);
          }
        `,
        errors: [
          {
            messageId: 'functionNameIsNotValid',
            suggestions: [
              {
                messageId: 'fixFunctionName',
                output: normalizeIndent`
                try {
                } catch(error) {
                  console.error(error);
                }
              `,
              },
            ],
          },
        ],
      },
      {
        name: 'when the first statement is the report function call but without the error as first argument.',
        code: normalizeIndent`
            try {
            } catch (error) {
              console.error();
            }
        `,
        errors: [
          {
            messageId: 'functionShouldHaveArg',
            suggestions: [
              {
                messageId: 'addArgument',
                output: normalizeIndent`
                try {
                } catch (error) {
                  console.error(error);
                }
                `,
              },
            ],
          },
        ],
      },
      {
        name: 'when the report function is called with something else than the error identifier name.',
        code: normalizeIndent`
            try {
            } catch (error) {
              console.error(someOtherValue);
            }
        `,
        errors: [
          {
            messageId: 'functionShouldHaveArg',
            suggestions: [
              {
                messageId: 'fixArgumentName',
                output: normalizeIndent`
                try {
                } catch (error) {
                  console.error(error);
                }
                `,
              },
            ],
          },
        ],
      },
    ],
  }
);
