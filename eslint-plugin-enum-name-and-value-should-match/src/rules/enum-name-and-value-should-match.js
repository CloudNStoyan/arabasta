'use strict';

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    messages: {
      enumNameAndValueMismatch:
        'Enum values are required to be the same as the enum keys',
      setEnumValueAsTheKey: 'Set the enum value as the enum key name.',
    },
    type: 'problem',
    hasSuggestions: true,
    docs: {
      description: 'requires enum values to match the name of their key',
      recommended: true,
    },
    schema: [],
  },
  create: (context) => {
    return {
      TSEnumMember(node) {
        if (
          node.id.type !== 'Identifier' ||
          node.initializer.type !== 'Literal'
        ) {
          return;
        }

        const enumName = node.id.name;
        const enumValue = node.initializer.value;

        if (enumName !== enumValue) {
          context.report({
            node,
            messageId: 'enumNameAndValueMismatch',
            suggest: [
              {
                messageId: 'setEnumValueAsTheKey',
                fix: (fixer) => {
                  return fixer.replaceText(node.initializer, `"${enumName}"`);
                },
              },
            ],
          });
        }
      },
    };
  },
};
