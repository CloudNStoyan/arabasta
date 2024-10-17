import requireTagsMetadata from './require-tags-metadata';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { normalizeIndent } from '../test-utils';

const TEST_TSOA_CONFIG_FILEPATH =
  './src/test-fixtures/partial-tsoa-config.json';

const ruleTester = new RuleTester();

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  'require-tags-metadata', // rule name
  requireTagsMetadata, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        name: 'when the tag has metadata in the tsoa config',
        code: normalizeIndent`
        @Tags('test_tag_1')
        class Users {}
        `,
        options: [
          {
            tsoaConfigFilePath: TEST_TSOA_CONFIG_FILEPATH,
          },
        ],
      },
      {
        name: 'when multiple tags have metadata in the tsoa config',
        code: normalizeIndent`
        @Tags('test_tag_1', 'test_tag_2')
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
        name: "when the tag doesn't have metadata in the tsoa config",
        code: normalizeIndent`
        @Tags('not_in_tsoa_config')
        class Users {}
        `,
        options: [
          {
            tsoaConfigFilePath: TEST_TSOA_CONFIG_FILEPATH,
          },
        ],
        errors: [
          {
            messageId: 'tagNotDefinedInConfig',
          },
        ],
      },
      {
        name: 'when not all tags have metadata in the tsoa config',
        code: normalizeIndent`
        @Tags('test_tag_1', 'not_in_tsoa_config')
        class Users {}
        `,
        options: [
          {
            tsoaConfigFilePath: TEST_TSOA_CONFIG_FILEPATH,
          },
        ],
        errors: [
          {
            messageId: 'tagNotDefinedInConfig',
          },
        ],
      },
    ],
  }
);
