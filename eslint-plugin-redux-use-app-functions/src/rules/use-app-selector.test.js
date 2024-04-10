"use strict";

const { RuleTester } = require("eslint");
const useAppSelectorRule = require("./use-app-selector.js");

const ruleTester = new RuleTester();

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  "use-app-selector", // rule name
  useAppSelectorRule, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        code: "useAppSelector();",
      },
      {
        code: "foo();",
      },
      {
        code: "bar();",
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        code: "useSelector();",
        output: "useAppSelector();",
        errors: 1,
      },
    ],
  }
);
