import { PLUGIN_DOCS_URL } from '../utils';
import type { Rule } from 'eslint';
import type * as ESTree from 'estree';

const TESTING_LIBRARY_SCOPE = '@testing-library';
const CLEANUP_FUNCTION_NAME = 'cleanup';

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      noTestingLibraryWithoutCleanup:
        'When importing from Testing Library you should use the cleanup function.',
    },
    type: 'problem',
    docs: {
      description:
        'require the usage of the cleanup function when importing from Testing Library',
      recommended: true,
      url: `${PLUGIN_DOCS_URL}/no-testing-library-without-cleanup.md`,
    },
    schema: [],
  },
  create(context) {
    function isLiteralString(node: ESTree.Node) {
      return (
        (node.type === 'Literal' && typeof node.value === 'string') ||
        (node.type === 'TemplateLiteral' && node.expressions.length === 0)
      );
    }

    function isCommonImport(node: ESTree.CallExpression) {
      if (node.callee.type !== 'Identifier') {
        return false;
      }
      if (node.callee.name !== 'require') {
        return false;
      }

      if (node.arguments.length !== 1) {
        return false;
      }
      if (!isLiteralString(node.arguments[0])) {
        return false;
      }

      return true;
    }

    let testingLibraryImportNode:
      | ESTree.Node
      | ESTree.CallExpression
      | undefined;

    let hasCleanupFunctionInvoked = false;

    return {
      ImportDeclaration: (node) => {
        if (testingLibraryImportNode) {
          return;
        }

        const source = node.source;

        if (
          source &&
          source.type === 'Literal' &&
          typeof source.value === 'string' &&
          source.value.startsWith(TESTING_LIBRARY_SCOPE)
        ) {
          testingLibraryImportNode = node;
        }
      },
      CallExpression: (node) => {
        if (hasCleanupFunctionInvoked) {
          return;
        }

        if (isCommonImport(node)) {
          if (testingLibraryImportNode) {
            return;
          }

          const modulePath = node.arguments[0];
          if (
            'value' in modulePath &&
            typeof modulePath.value === 'string' &&
            modulePath.value.startsWith(TESTING_LIBRARY_SCOPE)
          ) {
            testingLibraryImportNode = node;
          }
          return;
        }

        if (
          'name' in node.callee &&
          node.callee.name === CLEANUP_FUNCTION_NAME
        ) {
          hasCleanupFunctionInvoked = true;
          return;
        }

        if (
          'property' in node.callee &&
          node.callee.property &&
          'name' in node.callee.property &&
          node.callee.property.name === CLEANUP_FUNCTION_NAME
        ) {
          hasCleanupFunctionInvoked = true;
        }
      },
      'Program:exit': () => {
        if (!hasCleanupFunctionInvoked && testingLibraryImportNode) {
          context.report({
            node: testingLibraryImportNode,
            messageId: 'noTestingLibraryWithoutCleanup',
          });
        }
      },
    };
  },
};

export default rule;
