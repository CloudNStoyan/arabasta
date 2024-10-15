import { getTypeName } from '@typescript-eslint/type-utils';
import { ESLintUtils } from '@typescript-eslint/utils';
import { createRule } from '../utils';

type RuleOptions = [
  {
    allowedTypes: 'any' | string[];
  },
];

type RuleMessageIds =
  | 'requiredTypeArguments'
  | 'firstTypeArgIsNotFromTheAllowedTypes';

export default createRule<RuleOptions, RuleMessageIds>({
  name: 'valid-response-decorator-type',
  meta: {
    messages: {
      requiredTypeArguments:
        'The Response decorator is required to have type arguments.',
      firstTypeArgIsNotFromTheAllowedTypes:
        "The first type argument of the Response decorator should be one of '{{ allowedTypes }}'",
    },
    type: 'problem',
    docs: {
      description:
        "Enforce that Response's first type argument exists and optionally is one of the allowed types.",
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          allowedTypes: {
            oneOf: [
              {
                items: {
                  type: 'string',
                },
                type: 'array',
              },
              {
                type: 'string',
                enum: ['any'],
              },
            ],
          },
        },
      },
    ],
  },
  defaultOptions: [
    {
      allowedTypes: 'any',
    },
  ],
  create: (context, [{ allowedTypes }]) => {
    const services = ESLintUtils.getParserServices(context);
    const checker = services.program.getTypeChecker();

    return {
      Decorator(node) {
        if (
          node.expression.type !== 'CallExpression' ||
          node.expression.callee.type !== 'Identifier' ||
          node.expression.callee.name !== 'Response'
        ) {
          return;
        }

        const decoratorArguments = node.expression.arguments;

        if (
          !Array.isArray(decoratorArguments) ||
          decoratorArguments.length === 0 ||
          !('value' in decoratorArguments[0])
        ) {
          return;
        }

        const responseStatusCode = String(decoratorArguments[0].value);

        if (
          !responseStatusCode.startsWith('4') &&
          !responseStatusCode.startsWith('5')
        ) {
          return;
        }

        const typeArguments = node.expression.typeArguments;

        if (
          !(
            typeArguments &&
            typeArguments.type === 'TSTypeParameterInstantiation' &&
            Array.isArray(typeArguments.params) &&
            typeArguments.params.length > 0 &&
            typeArguments.params[0]
          )
        ) {
          context.report({
            node,
            messageId: 'requiredTypeArguments',
          });
          return;
        }

        if (allowedTypes === 'any') {
          return;
        }

        const firstTypeParamTypeName = getTypeName(
          checker,
          services.getTypeAtLocation(typeArguments.params[0])
        );

        if (!allowedTypes.includes(firstTypeParamTypeName)) {
          context.report({
            node,
            messageId: 'firstTypeArgIsNotFromTheAllowedTypes',
            data: {
              allowedTypes: allowedTypes.join(', '),
            },
          });
        }
      },
    };
  },
});
