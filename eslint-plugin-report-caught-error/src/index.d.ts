import type { Linter, Rule } from "eslint";

export const configs: {
  "recommended-legacy": Linter.Config;
  recommended: Linter.FlatConfig;
};

export const rules: {
  "report-caught-error": Rule.RuleModule;
};
