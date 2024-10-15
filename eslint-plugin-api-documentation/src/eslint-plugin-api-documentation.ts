import requireExampleDecoratorRule from './rules/require-example-decorator.js';
import validAlternativeResponseRule from './rules/valid-alternative-response.js';
import validSecurityDecoratorRule from './rules/valid-security-decorator.js';
import validExampleDecoratorTypeRule from './rules/valid-example-decorator-type.js';
import validAlternativeResponseTypeRule from './rules/valid-alternative-response-type.js';
import validResponseDecoratorTypeRule from './rules/valid-response-decorator-type.js';
import requireJsdocExampleForEnumTypeRule from './rules/require-jsdoc-example-for-enum-type.js';
import requireTagsMetadataRule from './rules/require-tags-metadata.js';
import requireSecurityMetadataRule from './rules/require-security-metadata.js';
import requireJsdocReturnsRule from './rules/require-jsdoc-returns.js';

const plugin = {
  meta: {
    name: '@arabasta/eslint-plugin-api-documentation',
    version: '1.0.0',
  },
  configs: {},
  rules: {
    'require-example-decorator': requireExampleDecoratorRule,
    'require-jsdoc-returns': requireJsdocReturnsRule,
    'valid-alternative-response': validAlternativeResponseRule,
    'valid-alternative-response-type': validAlternativeResponseTypeRule,
    'valid-security-decorator': validSecurityDecoratorRule,
    'valid-example-decorator-type': validExampleDecoratorTypeRule,
    'valid-response-decorator-type': validResponseDecoratorTypeRule,
    'require-jsdoc-example-for-enum-type': requireJsdocExampleForEnumTypeRule,
    'require-tags-metadata': requireTagsMetadataRule,
    'require-security-metadata': requireSecurityMetadataRule,
  },
  processors: {},
};

const recommendedRules = {
  '@arabasta/api-documentation/require-example-decorator': 'error',
  '@arabasta/api-documentation/require-jsdoc-returns': 'error',
  '@arabasta/api-documentation/valid-alternative-response': 'error',
  '@arabasta/api-documentation/valid-alternative-response-type': 'error',
  '@arabasta/api-documentation/valid-security-decorator': 'error',
  '@arabasta/api-documentation/valid-example-decorator-type': 'error',
  '@arabasta/api-documentation/valid-response-decorator-type': 'error',
  '@arabasta/api-documentation/require-jsdoc-example-for-enum-type': 'error',
  '@arabasta/api-documentation/require-tags-metadata': 'error',
  '@arabasta/api-documentation/require-security-metadata': 'error',
};

plugin.configs = {
  recommended: {
    name: '@arabasta/eslint-plugin-api-documentation/recommended',
    plugins: {
      '@arabasta/api-documentation': plugin,
    },
    rules: recommendedRules,
  },
  'recommended-legacy': {
    plugins: ['@arabasta/api-documentation'],
    rules: recommendedRules,
  },
};

export = plugin;
