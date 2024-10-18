import type { Linter, Rule, ESLint } from 'eslint';

declare const plugin: ESLint.Plugin & {
  configs: {
    'recommended-legacy': Linter.LegacyConfig;
    recommended: Linter.Config;
  };
  rules: {
    'report-caught-error': Rule.RuleModule;
  };
};

export = plugin;
