import type { Linter, Rule } from "eslint";

export const configs: {
  "recommended-legacy": Linter.Config;
  recommended: Linter.FlatConfig;
};

export const rules: {
  "use-app-dispatch": Rule.RuleModule;
  "use-app-selector": Rule.RuleModule;
  "use-create-app-async-thunk": Rule.RuleModule;
};
