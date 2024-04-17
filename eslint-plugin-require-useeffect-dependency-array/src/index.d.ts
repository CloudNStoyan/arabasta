import type { Linter, Rule } from 'eslint';

export const configs: {
  'recommended-legacy': Linter.Config;
  recommended: Linter.FlatConfig;
};

export const rules: {
  'require-useeffect-dependency-array': Rule.RuleModule;
};
