import { TSESTree } from '@typescript-eslint/utils';
import {
  createRule,
  hasDecoratorWithName,
  hasHttpMethodDecorator,
} from '../utils.js';

export default createRule({
  name: 'require-example-decorator',
  meta: {
    messages: {
      missingRequiredDecorators:
        "The '@Example' decorator is required when the method returns an array",
    },
    type: 'problem',
    docs: {
      description:
        'require the `@Example` decorator on methods that return an array',
      recommended: true,
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    function getMethodDefinitionReturnType(
      methodDefinitionNode: TSESTree.MethodDefinition
    ) {
      if (!methodDefinitionNode?.value?.returnType?.typeAnnotation) {
        return null;
      }

      const typeAnnotation =
        methodDefinitionNode.value.returnType.typeAnnotation;

      if (
        typeAnnotation.type === 'TSTypeReference' &&
        'name' in typeAnnotation.typeName &&
        typeAnnotation.typeName.name === 'Promise' &&
        typeAnnotation.typeArguments
      ) {
        return typeAnnotation.typeArguments.params[0];
      }

      return typeAnnotation;
    }

    return {
      MethodDefinition(node) {
        const returnType = getMethodDefinitionReturnType(node);

        if (
          returnType &&
          returnType.type === 'TSArrayType' &&
          hasHttpMethodDecorator(node) &&
          !hasDecoratorWithName({ node, decoratorName: 'Example' })
        ) {
          context.report({
            node,
            messageId: 'missingRequiredDecorators',
          });
        }
      },
    };
  },
});
