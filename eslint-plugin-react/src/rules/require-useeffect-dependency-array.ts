import { PLUGIN_DOCS_URL } from '../utils';
import type { Rule } from 'eslint';

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      requireDependencyArray: 'useEffect should have a dependency array.',
    },
    type: 'problem',
    docs: {
      description: 'require `useEffect` to have a dependency array',
      recommended: true,
      url: `${PLUGIN_DOCS_URL}/require-useeffect-dependency-array.md`,
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === 'useEffect'
        ) {
          const dependencies = node.arguments[1];
          if (!(dependencies && dependencies.type === 'ArrayExpression')) {
            context.report({
              node,
              messageId: 'requireDependencyArray',
              fix(fixer) {
                return fixer.insertTextAfter(node.arguments[0], ', []');
              },
            });
          }
        }
      },
    };
  },
};

export default rule;
