import requireExampleDecoratorRule from './rules/require-example-decorator.js';
import validAlternativeResponseRule from './rules/valid-alternative-response.js';
import validSecurityDecoratorRule from './rules/valid-security-decorator.js';
import validExampleDecoratorTypeRule from './rules/valid-example-decorator-type.js';
import validAlternativeResponseTypeRule from './rules/valid-alternative-response-type.js';
import validResponseDecoratorTypeRule from './rules/valid-response-decorator-type.js';
import requireJsdocExampleForEnumPropertyTypeRule from './rules/require-jsdoc-example-for-enum-property-type.js';
import requireTagsMetadataRule from './rules/require-tags-metadata.js';
import requireSecurityMetadataRule from './rules/require-security-metadata.js';
import requireJsdocReturnsRule from './rules/require-jsdoc-returns.js';
import requireTagsDecoratorRule from './rules/require-tags-decorator.js';
import noJsdocExampleForComplexPropertyTypeRule from './rules/no-jsdoc-example-for-complex-property-type.js';

const plugin = {
  meta: {
    name: '@arabasta/eslint-plugin-tsoa',
    version: '1.0.0',
  },
  configs: {},
  rules: {
    'no-jsdoc-example-for-complex-property-type':
      noJsdocExampleForComplexPropertyTypeRule,
    'require-example-decorator': requireExampleDecoratorRule,
    'require-jsdoc-returns': requireJsdocReturnsRule,
    'valid-alternative-response': validAlternativeResponseRule,
    'valid-alternative-response-type': validAlternativeResponseTypeRule,
    'valid-security-decorator': validSecurityDecoratorRule,
    'valid-example-decorator-type': validExampleDecoratorTypeRule,
    'valid-response-decorator-type': validResponseDecoratorTypeRule,
    'require-jsdoc-example-for-enum-property-type':
      requireJsdocExampleForEnumPropertyTypeRule,
    'require-tags-metadata': requireTagsMetadataRule,
    'require-security-metadata': requireSecurityMetadataRule,
    'require-tags-decorator': requireTagsDecoratorRule,
  },
  processors: {},
};

const recommendedRules = {
  '@arabasta/tsoa/no-jsdoc-example-for-complex-property-type': 'error',
  '@arabasta/tsoa/require-example-decorator': 'error',
  '@arabasta/tsoa/require-jsdoc-returns': 'error',
  '@arabasta/tsoa/valid-alternative-response': 'error',
  '@arabasta/tsoa/valid-alternative-response-type': 'error',
  '@arabasta/tsoa/valid-security-decorator': 'error',
  '@arabasta/tsoa/valid-example-decorator-type': 'error',
  '@arabasta/tsoa/valid-response-decorator-type': 'error',
  '@arabasta/tsoa/require-jsdoc-example-for-enum-property-type': 'error',
  '@arabasta/tsoa/require-tags-metadata': 'error',
  '@arabasta/tsoa/require-security-metadata': 'error',
  '@arabasta/tsoa/require-tags-decorator': 'error',
};

plugin.configs = {
  recommended: {
    name: '@arabasta/eslint-plugin-tsoa/recommended',
    plugins: {
      '@arabasta/tsoa': plugin,
    },
    rules: recommendedRules,
  },
  'recommended-legacy': {
    plugins: ['@arabasta/tsoa'],
    rules: recommendedRules,
  },
};

export = plugin;
