import { TSESTree } from '@typescript-eslint/utils';
import {
  getFullFunctionName,
  getAllDecoratorsWithName,
  hasResponseDecoratorWithStatus,
  createRule,
} from '../utils.js';

type RuleOptions = [
  {
    functionNames?: string[];
    specialStatuses?: {
      functionName: string;
      statusCode: number;
    }[];
  },
];

type RuleMessageIds = 'noCorrectResponseDecorator';

export default createRule<RuleOptions, RuleMessageIds>({
  name: 'valid-alternative-response',
  meta: {
    messages: {
      noCorrectResponseDecorator:
        "Using '{{ functionName }}' inside a method requires you to have '@Response({{ status }})' decorator on the method",
    },
    type: 'problem',
    docs: {
      description:
        'Enforce that correct response decorators are used when using alternative responses.',
      recommended: true,
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          functionNames: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          specialStatuses: {
            items: {
              type: 'object',
              properties: {
                functionName: {
                  type: 'string',
                },
                statusCode: {
                  type: 'number',
                },
              },
            },
            type: 'array',
          },
        },
      },
    ],
  },
  defaultOptions: [
    {
      functionNames: ['this.errorResult', 'this.noContentResult'],
      specialStatuses: [
        {
          functionName: 'this.noContentResult',
          statusCode: 204,
        },
      ],
    },
  ],
  create(context, [{ functionNames, specialStatuses }]) {
    const specialStatusesMap = new Map();

    if (specialStatuses) {
      for (const specialStatus of specialStatuses!) {
        specialStatusesMap.set(
          specialStatus.functionName,
          specialStatus.statusCode
        );
      }
    }

    let usedFunctions: {
      fullFunctionName: string;
      arguments: TSESTree.CallExpressionArgument[];
      typeArguments: TSESTree.TypeNode[] | undefined;
      node: TSESTree.CallExpression;
    }[] = [];

    function recordUsedFunctions(functionNode: TSESTree.CallExpression) {
      const fullFunctionName = getFullFunctionName(functionNode.callee);

      usedFunctions.push({
        fullFunctionName,
        arguments: functionNode.arguments,
        typeArguments: functionNode.typeArguments?.params,
        node: functionNode,
      });
    }

    let currentClassDeclarationNode: TSESTree.ClassDeclaration;

    return {
      ClassDeclaration(node) {
        currentClassDeclarationNode = node;
      },
      'MethodDefinition FunctionExpression > BlockStatement CallExpression': (
        node
      ) => {
        recordUsedFunctions(node);
      },
      'MethodDefinition:exit': (node) => {
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

        for (const usedFunction of usedFunctions) {
          if (
            !functionNames ||
            !functionNames.includes(usedFunction.fullFunctionName)
          ) {
            continue;
          }

          let status: number;
          if (specialStatusesMap.has(usedFunction.fullFunctionName)) {
            status = specialStatusesMap.get(usedFunction.fullFunctionName);
          } else {
            if (
              !Array.isArray(usedFunction.arguments) ||
              usedFunction.arguments.length === 0 ||
              !('value' in usedFunction.arguments[0]) ||
              typeof usedFunction.arguments[0].value !== 'number'
            ) {
              continue;
            }

            status = usedFunction.arguments[0].value;
          }

          if (
            !Array.isArray(responseDecorators) ||
            !hasResponseDecoratorWithStatus({
              status,
              decorators: responseDecorators,
            })
          ) {
            context.report({
              node,
              messageId: 'noCorrectResponseDecorator',
              data: {
                functionName: usedFunction.fullFunctionName,
                status,
              },
            });
          }
        }

        usedFunctions = [];
      },
    };
  },
});
