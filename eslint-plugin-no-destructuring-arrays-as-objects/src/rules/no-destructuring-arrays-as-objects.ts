import { ESLintUtils } from '@typescript-eslint/utils';
import * as tsutils from 'ts-api-utils';

const PLUGIN_DOCS_URL =
  'https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-no-destructuring-arrays-as-objects/README.md';

interface PluginDocs {
  description: string;
  recommended: boolean;
  requiresTypeChecking: true;
}

const createRule = ESLintUtils.RuleCreator<PluginDocs>(
  (name) => `${PLUGIN_DOCS_URL}#${name}`
);

export = createRule({
  name: 'no-destructuring-arrays-as-objects',
  meta: {
    messages: {
      noDestructuringArraysAsObjects:
        'Destructuring arrays as objects is forbidden.',
    },
    type: 'problem',
    docs: {
      description: 'Disallow destructuring arrays as objects.',
      recommended: true,
      requiresTypeChecking: true,
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      VariableDeclarator: (node) => {
        if (!node.init || node.id.type !== 'ObjectPattern') {
          return;
        }

        const services = ESLintUtils.getParserServices(context);
        const checker = services.program.getTypeChecker();

        const type = services.getTypeAtLocation(node.init);

        const unionParts = tsutils.unionTypeParts(type);

        if (unionParts.some((part) => checker.isArrayType(part))) {
          context.report({
            node,
            messageId: 'noDestructuringArraysAsObjects',
          });
        }
      },
    };
  },
});
