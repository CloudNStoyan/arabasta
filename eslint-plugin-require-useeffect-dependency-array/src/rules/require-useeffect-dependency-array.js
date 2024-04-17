"use strict";

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    messages: {
      requireDependencyArray: "useEffect should have a dependency array.",
    },
    type: "problem",
    docs: {
      description: "Enforce that useEffect has a dependency array.",
      recommended: true,
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === "Identifier" &&
          node.callee.name === "useEffect"
        ) {
          const dependencies = node.arguments[1];
          if (!(dependencies && dependencies.type === "ArrayExpression")) {
            context.report({
              node,
              messageId: "requireDependencyArray",
              fix(fixer) {
                return fixer.insertTextAfter(node.arguments[0], ", []");
              },
            });
          }
        }
      },
    };
  },
};
