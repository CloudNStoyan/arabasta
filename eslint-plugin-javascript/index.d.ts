import { ESLint, Linter, Rule } from 'eslint';

declare const plugin: ESLint.Plugin & {
  configs: {
    recommended: Linter.Config;
    'recommended-legacy': Linter.LegacyConfig;
  };
  rules: {
    'report-caught-error': Rule.RuleModule;
    'use-alternative-functions': Rule.RuleModule;
  };
};

export = plugin;
