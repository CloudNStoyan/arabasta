import { getFullFunctionName, parseOptions, PLUGIN_DOCS_URL } from '../utils';
import type { Rule } from 'eslint';

interface AppAlternative {
  alternativeTo: string;
  appFunction: string;
}

interface RuleOptions {
  alternatives: AppAlternative[];
}

const defaultRuleOptions: RuleOptions = {
  alternatives: [
    {
      alternativeTo: 'useDispatch',
      appFunction: 'useAppDispatch',
    },
    {
      alternativeTo: 'useSelector',
      appFunction: 'useAppSelector',
    },
  ],
};

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      useAppFunction:
        "You must use '{{ alternative }}' instead of '{{ functionName }}'.",
    },
    type: 'problem',
    docs: {
      description: 'require the usage of app alternative functions',
      recommended: true,
      url: `${PLUGIN_DOCS_URL}/use-app-alternatives.md`,
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
                alternativeTo: {
                  type: 'string',
                  description:
                    'The name of the function that will be replaced by the alternative function.',
                },
                appFunction: {
                  type: 'string',
                  description:
                    'The name of the alternative function that will replace the `alternativeTo` function.',
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

    const alternativeFunctionsMap = new Map<string, AppAlternative>();

    for (const alternative of alternatives) {
      alternativeFunctionsMap.set(alternative.alternativeTo, alternative);
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
          messageId: 'useAppFunction',
          data: {
            alternative: alternative.appFunction,
            functionName: fullFunctionName,
          },
          fix: (fixer) => {
            return fixer.replaceText(node.callee, alternative.appFunction);
          },
        });
      },
    };
  },
};

export default rule;
