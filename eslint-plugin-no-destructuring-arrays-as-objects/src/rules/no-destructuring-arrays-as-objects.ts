import { ESLintUtils } from "@typescript-eslint/utils";
import * as tsutils from "ts-api-utils";

export = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    messages: {
      noDestructuringArraysAsObjects:
        "Destructuring arrays as objects is forbidden.",
    },
    type: "problem",
    docs: {
      description: "Disallow destructuring arrays as objects.",
      recommended: "recommended",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      VariableDeclarator: (node) => {
        if (!node.init || node.id.type !== "ObjectPattern") {
          return;
        }

        const services = ESLintUtils.getParserServices(context);
        const checker = services.program.getTypeChecker();

        const type = services.getTypeAtLocation(node.init);

        const unionParts = tsutils.unionTypeParts(type);

        if (unionParts.some((part) => checker.isArrayType(part))) {
          context.report({
            node,
            messageId: "noDestructuringArraysAsObjects",
          });
        }
      },
    };
  },
});
