import type { TSESLint } from '@typescript-eslint/utils';

export const configs: {
  'recommended-legacy': TSESLint.ClassicConfig.Config;
  recommended: TSESLint.FlatConfig.Config;
};

export const rules: {
  'no-destructuring-arrays-as-objects': TSESLint.AnyRuleModule;
};
