import { createRule, hasDecoratorWithName } from '../utils.js';

export default createRule({
  name: 'require-property-example-decorator',
  meta: {
    messages: {
      missingExampleDecorator:
        "The '@Example' decorator is required on class properties",
    },
    type: 'problem',
    docs: {
      description: 'require the `@Example` decorator on class properties',
      recommended: true,
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      PropertyDefinition(node) {
        if (!hasDecoratorWithName({ node, decoratorName: 'Example' })) {
          context.report({
            node,
            messageId: 'missingExampleDecorator',
          });
        }
      },
    };
  },
});
