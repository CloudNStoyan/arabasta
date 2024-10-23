import { createRule } from '../utils';

export = createRule({
  name: 'enum-value-should-match-enum-name',
  meta: {
    messages: {
      enumNameAndValueMismatch:
        'Enum values are required to be the same as the enum keys',
      setEnumValueAsTheKey: 'Set the enum value as the enum key name.',
    },
    type: 'problem',
    hasSuggestions: true,
    docs: {
      description: 'requires enum values to match enum keys',
      recommended: true,
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => {
    return {
      TSEnumMember(node) {
        const nodeInitializer = node.initializer;

        if (
          node.id.type !== 'Identifier' ||
          nodeInitializer?.type !== 'Literal'
        ) {
          return;
        }

        const enumName = node.id.name;
        const enumValue = nodeInitializer.value;

        if (enumName !== enumValue) {
          context.report({
            node,
            messageId: 'enumNameAndValueMismatch',
            suggest: [
              {
                messageId: 'setEnumValueAsTheKey',
                fix: (fixer) => {
                  return fixer.replaceText(nodeInitializer, `"${enumName}"`);
                },
              },
            ],
          });
        }
      },
    };
  },
});
