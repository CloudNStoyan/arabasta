import { TSESLint } from '@typescript-eslint/utils';

declare const plugin: TSESLint.FlatConfig.Plugin & {
  configs: {
    recommended: TSESLint.FlatConfig.Config;
    'recommended-legacy': TSESLint.ClassicConfig.Config;
  };
  rules: {
    'no-destructuring-arrays-as-objects': TSESLint.AnyRuleModule;
    'enum-value-should-match-enum-name': TSESLint.AnyRuleModule;
  };
};

export = plugin;
