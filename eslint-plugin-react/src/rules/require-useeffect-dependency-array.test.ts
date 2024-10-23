import requireDependencyArrayRule from './require-useeffect-dependency-array';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  'require-useeffect-dependency-array', // rule name
  requireDependencyArrayRule, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        name: 'when using useEffect with a dependency array.',
        code: 'useEffect(() => {}, [])',
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        name: 'when using useEffect without a dependency array.',
        code: 'useEffect(() => {})',
        output: 'useEffect(() => {}, [])',
        errors: [
          {
            messageId: 'requireDependencyArray',
          },
        ],
      },
    ],
  }
);
