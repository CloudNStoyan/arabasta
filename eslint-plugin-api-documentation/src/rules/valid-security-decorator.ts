import { TSESTree } from '@typescript-eslint/utils';
import {
  hasDecoratorWithName,
  hasResponseDecoratorWithStatus,
  getAllDecoratorsWithName,
  createRule,
} from '../utils';

export default createRule({
  name: 'valid-security-decorator',
  meta: {
    messages: {
      requireCorrectResponseDecorator:
        "Methods using the Security decorator or being inside a class that uses it are required to have the '@Response(401)' decorator on them or their class",
    },
    type: 'problem',
    docs: {
      description:
        'Require Response(401) decorator on methods or classes that are affected by the Security decorator.',
      recommended: true,
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => {
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
            status: 401,
            decorators: responseDecorators,
          })
        ) {
          context.report({
            node,
            messageId: 'requireCorrectResponseDecorator',
          });
        }
      },
    };
  },
});
