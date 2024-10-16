import fs from 'node:fs';
import { createRule } from '../utils';
import { TSESTree } from '@typescript-eslint/utils';

interface PartialTsoaConfig {
  spec?: {
    tags?: { name: string }[];
  };
}

type RuleOptions = [
  {
    tsoaConfigFilePath: string;
  },
];

type RuleMessageIds = 'tagNotDefinedInConfig';

export default createRule<RuleOptions, RuleMessageIds>({
  name: 'require-tags-metadata',
  meta: {
    messages: {
      tagNotDefinedInConfig:
        "The following tags are missing from the tsoa.json config '{{ missingTagNames }}'",
    },
    type: 'problem',
    docs: {
      description:
        'Enforce that all tags used in the @Tags decorator are present in the tsoa.json config.',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          tsoaConfigFilePath: {
            type: 'string',
            description: "Where the TSOA's config file is located.",
          },
        },
      },
    ],
  },
  defaultOptions: [
    {
      tsoaConfigFilePath: './tsoa.json',
    },
  ],
  create: (context, [{ tsoaConfigFilePath }]) => {
    const decorators: TSESTree.Decorator[] = [];

    function getDefinedTsoaTagNames(tsoaConfig: PartialTsoaConfig) {
      if (Array.isArray(tsoaConfig.spec?.tags)) {
        return tsoaConfig.spec.tags
          .filter((tag) => typeof tag.name === 'string')
          .map((tag) => tag.name);
      }

      return [];
    }

    return {
      Decorator(node) {
        if (
          node.expression.type !== 'CallExpression' ||
          node.expression.callee.type !== 'Identifier' ||
          node.expression.callee.name !== 'Tags'
        ) {
          return;
        }

        decorators.push(node);
      },
      'Program:exit': () => {
        if (decorators.length === 0) {
          return;
        }

        let tsoaConfigJson;
        try {
          tsoaConfigJson = fs.readFileSync(tsoaConfigFilePath, {
            encoding: 'utf-8',
          });
        } catch (error) {
          console.warn(error);
          return;
        }

        let tsoaConfig;
        try {
          tsoaConfig = JSON.parse(tsoaConfigJson);
        } catch (error) {
          console.warn(error);
          return;
        }

        if (typeof tsoaConfig !== 'object') {
          console.warn(
            `Expected tsoa config to be an object but got '${typeof tsoaConfig}' instead.`
          );
          return;
        }

        const tsoaTagNames = getDefinedTsoaTagNames(tsoaConfig);

        for (const decorator of decorators) {
          const expression = decorator.expression;

          if (
            !('arguments' in expression) ||
            !Array.isArray(expression.arguments)
          ) {
            continue;
          }

          const missingTagNames = [];

          for (const tagArg of expression.arguments) {
            if (tagArg.type !== 'Literal' || typeof tagArg.value !== 'string') {
              continue;
            }

            const tagName = tagArg.value;

            if (!tsoaTagNames.includes(tagName)) {
              missingTagNames.push(tagName);
            }
          }

          if (missingTagNames.length > 0) {
            context.report({
              node: decorator,
              messageId: 'tagNotDefinedInConfig',
              data: {
                missingTagNames: missingTagNames.join(', '),
              },
            });
          }
        }
      },
    };
  },
});
