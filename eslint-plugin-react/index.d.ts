import { ESLint, Linter, Rule } from 'eslint';

declare const plugin: ESLint.Plugin & {
  configs: {
    recommended: Linter.Config;
    'recommended-legacy': Linter.LegacyConfig;
  };
  rules: {
    'require-useeffect-dependency-array': Rule.RuleModule;
  };
};

export = plugin;
