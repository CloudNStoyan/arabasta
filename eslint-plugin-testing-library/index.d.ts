import { ESLint, Linter, Rule } from 'eslint';

declare const plugin: ESLint.Plugin & {
  configs: {
    recommended: Linter.Config;
    'recommended-legacy': Linter.LegacyConfig;
  };
  rules: {
    'no-testing-library-without-cleanup': Rule.RuleModule;
  };
};

export = plugin;
