const useAppDispatchRule = require("./rules/use-app-dispatch.js");
const useAppSelectorRule = require("./rules/use-app-selector.js");
const useCreateAppAsyncThunkRule = require("./rules/use-create-app-async-thunk.js");

/** @type {import('eslint').ESLint.Plugin} */
const plugin = {
  meta: {
    name: "@arabasta/eslint-plugin-redux-use-app-functions",
    version: "1.0.0",
  },
  configs: {},
  rules: {
    "use-app-dispatch": useAppDispatchRule,
    "use-app-selector": useAppSelectorRule,
    "use-create-app-async-thunk": useCreateAppAsyncThunkRule,
  },
  processors: {},
};

plugin.configs = {
  recommended: {
    plugins: {
      "@arabasta/redux-use-app-functions": plugin,
    },
    rules: {
      "@arabasta/redux-use-app-functions/use-app-dispatch": "error",
      "@arabasta/redux-use-app-functions/use-app-selector": "error",
      "@arabasta/redux-use-app-functions/use-create-app-async-thunk": "error",
    },
  },
  "recommended-legacy": {
    plugins: ["@arabasta/redux-use-app-functions"],
    rules: {
      "@arabasta/redux-use-app-functions/use-app-dispatch": "error",
      "@arabasta/redux-use-app-functions/use-app-selector": "error",
      "@arabasta/redux-use-app-functions/use-create-app-async-thunk": "error",
    },
  },
};

module.exports = plugin;
