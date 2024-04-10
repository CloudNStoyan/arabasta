"use strict";

const TESTING_LIBRARY_SCOPE = "@testing-library";
const CLEANUP_FUNCTION_NAME = "cleanup";

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    messages: {
      noTestingLibraryWithoutCleanup:
        "When importing from Testing Library you should use the cleanup function.",
    },
    type: "problem",
    docs: {
      description:
        "Enforce the usage of the cleanup function when importing from Testing Library.",
      recommended: true,
    },
    schema: [],
  },
  create(context) {
    /** @param {import('estree').Node} node */
    function isLiteralString(node) {
      return (
        (node.type === "Literal" && typeof node.value === "string") ||
        (node.type === "TemplateLiteral" && node.expressions.length === 0)
      );
    }

    /** @param {import('estree').CallExpression} node */
    function isCommonImport(node) {
      if (node.callee.type !== "Identifier") {
        return false;
      }
      if (node.callee.name !== "require") {
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

    let hasTestingLibraryImport = false;
    let testingLibraryImportNode = null;

    let hasCleanupFunctionInvoked = false;

    return {
      ImportDeclaration: (node) => {
        if (hasTestingLibraryImport) {
          return;
        }

        const source = node.source;

        if (
          source &&
          source.type === "Literal" &&
          source.value.startsWith(TESTING_LIBRARY_SCOPE)
        ) {
          hasTestingLibraryImport = true;
          testingLibraryImportNode = node;
        }
      },
      CallExpression: (node) => {
        if (hasCleanupFunctionInvoked) {
          return;
        }

        if (isCommonImport(node)) {
          if (hasTestingLibraryImport) {
            return;
          }

          const modulePath = node.arguments[0];
          if (modulePath.value.startsWith(TESTING_LIBRARY_SCOPE)) {
            hasTestingLibraryImport = true;
            testingLibraryImportNode = node;
          }
          return;
        }

        if (node.callee.name === CLEANUP_FUNCTION_NAME) {
          hasCleanupFunctionInvoked = true;
          return;
        }

        if (node.callee.property && node.callee.property.name === CLEANUP_FUNCTION_NAME) {
          hasCleanupFunctionInvoked = true;
        }
      },
      "Program:exit": () => {
        if (
          hasTestingLibraryImport &&
          !hasCleanupFunctionInvoked
        ) {
          context.report({
            node: testingLibraryImportNode,
            messageId: "noTestingLibraryWithoutCleanup",
          });
        }
      },
    };
  },
};
