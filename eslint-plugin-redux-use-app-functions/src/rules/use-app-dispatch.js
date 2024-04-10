"use strict";

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    messages: {
      useAppDispatch: "You must use 'useAppDispatch' instead of 'useDispatch'.",
    },
    type: "problem",
    docs: {
      description: "Enforces the usage of useAppDispatch.",
      recommended: true,
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type === "Identifier") {
          if (node.callee.name === "useDispatch") {
            context.report({
              node,
              messageId: "useAppDispatch",
              fix: (fixer) => {
                return fixer.replaceText(node.callee, "useAppDispatch");
              },
            });
          }
        }
      },
    };
  },
};
