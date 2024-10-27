import { getFullFunctionName, parseOptions, PLUGIN_DOCS_URL } from '../utils';
import type { Rule } from 'eslint';

interface AlternativeFunction {
  from: string;
  to: string;
}

interface RuleOptions {
  alternatives: AlternativeFunction[];
}

const defaultRuleOptions: RuleOptions = {
  alternatives: [],
};

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      useAlternativeFunction:
        "You must use '{{ to }}' instead of '{{ from }}'.",
    },
    type: 'problem',
    docs: {
      description: 'require the usage of alternative functions',
      recommended: false,
      url: `${PLUGIN_DOCS_URL}/use-alternative-functions.md`,
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          alternatives: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                from: {
                  type: 'string',
                  description:
                    'The name of the function that will be replaced by the alternative (`to`) function.',
                },
                to: {
                  type: 'string',
                  description:
                    'The name of the alternative function that will replace the `from` function.',
                },
              },
              description: 'An array of alternative functions.',
            },
          },
        },
      },
    ],
  },
  create(context) {
    const { alternatives } = parseOptions(context, defaultRuleOptions);

    const alternativeFunctionsMap = new Map<string, AlternativeFunction>();

    for (const alternative of alternatives) {
      alternativeFunctionsMap.set(alternative.from, alternative);
    }

    return {
      CallExpression(node) {
        const fullFunctionName = getFullFunctionName(node.callee);

        if (!alternativeFunctionsMap.has(fullFunctionName)) {
          return;
        }

        const alternative = alternativeFunctionsMap.get(fullFunctionName)!;

        context.report({
          node,
          messageId: 'useAlternativeFunction',
          data: {
            to: alternative.to,
            from: fullFunctionName,
          },
          fix: (fixer) => {
            return fixer.replaceText(node.callee, alternative.to);
          },
        });
      },
    };
  },
};

export default rule;
