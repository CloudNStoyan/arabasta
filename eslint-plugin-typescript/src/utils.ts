import { ESLintUtils } from '@typescript-eslint/utils';

const PLUGIN_DOCS_URL =
  'https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-typescript/docs/rules';

export interface TypescriptPluginRuleDocs {
  description: string;
  recommended?: boolean;
  requiresTypeChecking?: boolean;
}

export const createRule = ESLintUtils.RuleCreator<TypescriptPluginRuleDocs>(
  (name) => `${PLUGIN_DOCS_URL}/${name}.md`
);
