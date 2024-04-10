"use strict";

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    messages: {
      useAppFunctions:
        "You must use 'useAppSelector' instead of 'useSelector'.",
    },
    type: "problem",
    docs: {
      description: "Enforces the usage of useAppSelector.",
      recommended: true,
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type === "Identifier") {
          if (node.callee.name === "useSelector") {
            context.report({
              node,
              messageId: "useAppFunctions",
              data: {
                correctFunction: "useAppSelector",
                incorrectFunction: node.callee.name,
              },
              fix: (fixer) => {
                return fixer.replaceText(node.callee, "useAppSelector");
              },
            });
          }
        }
      },
    };
  },
};
