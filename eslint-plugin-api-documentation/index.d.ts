import type { TSESLint } from '@typescript-eslint/utils';

export const configs: {
  'recommended-legacy': TSESLint.ClassicConfig.Config;
  recommended: TSESLint.FlatConfig.Config;
};

export const rules: {
  'no-destructuring-arrays-as-objects': TSESLint.AnyRuleModule;
  'require-example-decorator': TSESLint.AnyRuleModule;
  'require-jsdoc-returns': TSESLint.AnyRuleModule;
  'valid-alternative-response': TSESLint.AnyRuleModule;
  'valid-alternative-response-type': TSESLint.AnyRuleModule;
  'valid-security-decorator': TSESLint.AnyRuleModule;
  'valid-example-decorator-type': TSESLint.AnyRuleModule;
  'valid-response-decorator-type': TSESLint.AnyRuleModule;
  'require-jsdoc-example-for-enum-type': TSESLint.AnyRuleModule;
  'require-tags-metadata': TSESLint.AnyRuleModule;
  'require-security-metadata': TSESLint.AnyRuleModule;
};
