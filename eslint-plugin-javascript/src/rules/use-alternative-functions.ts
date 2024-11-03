import { getFullFunctionName, PLUGIN_DOCS_URL } from '../utils';
import type { Rule } from 'eslint';

interface AlternativeFunction {
  from: string;
  to: string;
}

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
    schema: [],
  },
  create(context) {
    const alternativeFunctionsSetting =
      context.settings['@arabasta/alternative-functions'];

    if (typeof alternativeFunctionsSetting !== 'object') {
      return {};
    }

    const alternativeFunctionsArrays = Object.values(
      alternativeFunctionsSetting
    );

    const alternativeFunctionsMap = new Map<string, AlternativeFunction>();

    for (const alternatives of alternativeFunctionsArrays) {
      if (!Array.isArray(alternatives)) {
        continue;
      }

      for (const alternative of alternatives) {
        if (
          typeof alternative !== 'object' ||
          typeof alternative.from !== 'string' ||
          typeof alternative.to !== 'string'
        ) {
          continue;
        }

        alternativeFunctionsMap.set(alternative.from, alternative);
      }
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
