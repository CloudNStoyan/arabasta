import {
  createRule,
  hasDecoratorWithName,
  hasHttpMethodDecorator,
} from '../utils.js';

export default createRule({
  name: 'require-tags-decorator',
  meta: {
    messages: {
      missingTagsDecorator: "The '@Tags' decorator is required on controllers",
    },
    type: 'problem',
    docs: {
      description: 'require `@Tags` decorator on controllers',
      recommended: true,
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    let isController = false;

    return {
      MethodDefinition(node) {
        if (!isController && hasHttpMethodDecorator(node)) {
          isController = true;
        }
      },
      'ClassDeclaration:exit': (node) => {
        if (
          isController &&
          !hasDecoratorWithName({ node, decoratorName: 'Tags' })
        ) {
          context.report({
            node,
            messageId: 'missingTagsDecorator',
          });
        }

        isController = false;
      },
    };
  },
});
