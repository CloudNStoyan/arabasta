import { TSESTree } from '@typescript-eslint/utils';
import {
  hasDecoratorWithName,
  hasResponseDecoratorWithStatus,
  getAllDecoratorsWithName,
  createRule,
  StatusCode,
} from '../utils';

type RuleOptions = [
  {
    statusCode: StatusCode;
  },
];

type RuleMessageIds =
  | 'requireCorrectResponseDecoratorForMethods'
  | 'requireCorrectResponseDecoratorForClasses';

export default createRule<RuleOptions, RuleMessageIds>({
  name: 'valid-security-decorator',
  meta: {
    messages: {
      requireCorrectResponseDecoratorForMethods:
        "Methods using the '@Security' decorator or being inside a class that uses it are required to have the '@Response({{ statusCode }})' decorator on them or their class",
      requireCorrectResponseDecoratorForClasses:
        "Classes using the '@Security' decorator are required to have the '@Response({{ statusCode }})' decorator on them",
    },
    type: 'problem',
    docs: {
      description:
        'require `@Response` decorator with a specific status code on methods or classes that are affected by the `@Security` decorator',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          statusCode: {
            oneOf: [
              {
                type: 'string',
              },
              {
                type: 'number',
              },
            ],
            description:
              'The status code that has to be used with the `@Response` decorator',
          },
        },
      },
    ],
  },
  defaultOptions: [
    {
      statusCode: 401,
    },
  ],
  create: (context, [{ statusCode }]) => {
    let currentClassDeclarationNode: TSESTree.ClassDeclaration;

    return {
      ClassDeclaration(node) {
        currentClassDeclarationNode = node;
      },
      MethodDefinition(node) {
        if (
          !hasDecoratorWithName({ node, decoratorName: 'Security' }) &&
          !hasDecoratorWithName({
            node: currentClassDeclarationNode,
            decoratorName: 'Security',
          })
        ) {
          return;
        }

        const responseDecorators = [
          ...getAllDecoratorsWithName({
            node,
            decoratorName: 'Response',
          }),
          ...getAllDecoratorsWithName({
            node: currentClassDeclarationNode,
            decoratorName: 'Response',
          }),
        ];

        if (
          !hasResponseDecoratorWithStatus({
            status: statusCode,
            decorators: responseDecorators,
          })
        ) {
          context.report({
            node,
            messageId: 'requireCorrectResponseDecoratorForMethods',
            data: {
              statusCode,
            },
          });
        }
      },
      'ClassDeclaration:exit': (node) => {
        if (!hasDecoratorWithName({ node, decoratorName: 'Security' })) {
          return;
        }

        const responseDecorators = getAllDecoratorsWithName({
          node,
          decoratorName: 'Response',
        });

        if (
          !hasResponseDecoratorWithStatus({
            status: statusCode,
            decorators: responseDecorators,
          })
        ) {
          context.report({
            node,
            messageId: 'requireCorrectResponseDecoratorForClasses',
            data: {
              statusCode,
            },
          });
        }
      },
    };
  },
});
