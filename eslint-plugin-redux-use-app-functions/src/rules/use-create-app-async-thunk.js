'use strict';

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    messages: {
      useCreateAppAsyncThunk:
        "You must use 'createAppAsyncThunk' instead of 'createAsyncThunk'.",
    },
    type: 'problem',
    docs: {
      description: 'Enforces the usage of createAppAsyncThunk.',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type === 'Identifier') {
          if (node.callee.name === 'createAsyncThunk') {
            context.report({
              node,
              messageId: 'useCreateAppAsyncThunk',
              fix: (fixer) => {
                return fixer.replaceText(node.callee, 'createAppAsyncThunk');
              },
            });
          }
        }
      },
    };
  },
};
