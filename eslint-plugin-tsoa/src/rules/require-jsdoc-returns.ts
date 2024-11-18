import { getTypeName, isPromiseLike } from '@typescript-eslint/type-utils';
import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import { createRule, parseJSDoc } from '../utils';

type RuleOptions = [
  {
    disallowOnVoidOrUndefined?: boolean;
  },
];

type RuleMessageIds =
  | 'returnsIsMissing'
  | 'returnsIsNotAllowed'
  | 'returnsDescriptionIsMissing';

export default createRule<RuleOptions, RuleMessageIds>({
  name: 'require-jsdoc-returns',
  meta: {
    messages: {
      returnsIsMissing: "Missing JSDoc '@returns' declaration",
      returnsIsNotAllowed:
        "JSDoc '@returns' declaration is not allowed on methods that return 'void' or 'undefined'",
      returnsDescriptionIsMissing: "Missing JSDoc '@returns' description",
    },
    type: 'problem',
    docs: {
      description: 'require return statements to be documented',
      recommended: true,
      requiresTypeChecking: true,
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          disallowOnVoidOrUndefined: {
            type: 'boolean',
            description:
              "Whether to disallow JSDoc's '@returns' declaration on methods that return 'void' or 'undefined'.",
          },
        },
      },
    ],
  },
  defaultOptions: [
    {
      disallowOnVoidOrUndefined: true,
    },
  ],
  create(context, [{ disallowOnVoidOrUndefined }]) {
    const services = ESLintUtils.getParserServices(context);
    const checker = services.program.getTypeChecker();
    const sourceCode = context.sourceCode || context.getSourceCode();

    function getFunctionReturnTypeName(node: TSESTree.MethodDefinition) {
      const signatures = services.getTypeAtLocation(node).getCallSignatures();

      if (!signatures.length) {
        return;
      }

      const methodReturnType = checker.getReturnTypeOfSignature(signatures[0]);

      if (
        isPromiseLike(services.program, methodReturnType) &&
        'resolvedTypeArguments' in methodReturnType &&
        Array.isArray(methodReturnType.resolvedTypeArguments) &&
        methodReturnType.resolvedTypeArguments.length === 1 &&
        methodReturnType.resolvedTypeArguments[0]
      ) {
        return getTypeName(checker, methodReturnType.resolvedTypeArguments[0]);
      }

      return getTypeName(checker, methodReturnType);
    }

    return {
      MethodDefinition(node) {
        const returnType = getFunctionReturnTypeName(node);

        const { jsdoc, jsdocNode } = parseJSDoc(sourceCode, node);

        if (!jsdoc || !jsdocNode) {
          return;
        }

        const targetTagName = 'returns';

        const propertyReturns = jsdoc.tags.filter(({ tag }) => {
          return tag === targetTagName;
        });

        const returnTypeIsUndefinedOrVoid =
          returnType === 'void' || returnType === 'undefined';
        const hasReturnsJSDocDeclaration = propertyReturns.length > 0;

        if (returnTypeIsUndefinedOrVoid) {
          if (hasReturnsJSDocDeclaration && disallowOnVoidOrUndefined) {
            context.report({
              node: jsdocNode,
              messageId: 'returnsIsNotAllowed',
            });
          }
          return;
        }

        if (hasReturnsJSDocDeclaration) {
          const description = propertyReturns[0].description.trim();

          if (description.length === 0) {
            context.report({
              node,
              messageId: 'returnsDescriptionIsMissing',
            });
            return;
          }
        }

        if (!hasReturnsJSDocDeclaration) {
          context.report({
            node: jsdocNode,
            messageId: 'returnsIsMissing',
          });
        }
      },
    };
  },
});
