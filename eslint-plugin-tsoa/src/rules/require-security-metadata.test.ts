import requireSecurityMetadata from './require-security-metadata';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { normalizeIndent } from '../test-utils';

const TEST_TSOA_CONFIG_FILEPATH =
  './src/test-fixtures/partial-tsoa-config.json';

const ruleTester = new RuleTester();

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  'require-security-metadata', // rule name
  requireSecurityMetadata, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        name: 'when the security definition has metadata in the tsoa config',
        code: normalizeIndent`
        @Security('api_key')
        class Users {}
        `,
        options: [
          {
            tsoaConfigFilePath: TEST_TSOA_CONFIG_FILEPATH,
          },
        ],
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        name: "when the security definition doesn't have metadata in the tsoa config",
        code: normalizeIndent`
        @Security('not_in_tsoa_config')
        class Users {}
        `,
        options: [
          {
            tsoaConfigFilePath: TEST_TSOA_CONFIG_FILEPATH,
          },
        ],
        errors: [
          {
            messageId: 'securityDefinitionNotDefinedInConfig',
          },
        ],
      },
    ],
  }
);
