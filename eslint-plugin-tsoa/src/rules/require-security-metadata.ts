import fs from 'node:fs';
import { createRule } from '../utils';
import { TSESTree } from '@typescript-eslint/utils';

interface PartialTsoaConfig {
  spec?: {
    securityDefinitions?: {
      [name: string]: unknown;
    };
  };
}

type RuleOptions = [
  {
    tsoaConfigFilePath: string;
  },
];

type RuleMessageIds = 'securityDefinitionNotDefinedInConfig';

export default createRule<RuleOptions, RuleMessageIds>({
  name: 'require-security-metadata',
  meta: {
    messages: {
      securityDefinitionNotDefinedInConfig:
        "The following security definitions are missing from the TSOA config '{{ missingSecurityDefinitions }}'",
    },
    type: 'problem',
    docs: {
      description:
        'require all security definitions used by the `@Security` decorator to be present in the `TSOA` config',
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

    function getDefinedTsoaSecurityDefinitions(tsoaConfig: PartialTsoaConfig) {
      if (typeof tsoaConfig.spec?.securityDefinitions === 'object') {
        return Object.keys(tsoaConfig.spec.securityDefinitions);
      }

      return [];
    }

    return {
      Decorator(node) {
        if (
          node.expression.type !== 'CallExpression' ||
          node.expression.callee.type !== 'Identifier' ||
          node.expression.callee.name !== 'Security'
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

        const tsoaSecurityDefinitions =
          getDefinedTsoaSecurityDefinitions(tsoaConfig);

        for (const decorator of decorators) {
          const expression = decorator.expression;

          if (
            !('arguments' in expression) ||
            !Array.isArray(expression.arguments) ||
            !expression.arguments[0]
          ) {
            continue;
          }

          const missingSecurityDefinitions = [];

          const securityDefinitionArgument = expression.arguments[0];

          if (
            securityDefinitionArgument.type === 'Literal' &&
            typeof securityDefinitionArgument.value === 'string'
          ) {
            if (
              !tsoaSecurityDefinitions.includes(
                securityDefinitionArgument.value
              )
            ) {
              missingSecurityDefinitions.push(securityDefinitionArgument.value);
            }
          }

          if (
            securityDefinitionArgument.type === 'ObjectExpression' &&
            Array.isArray(securityDefinitionArgument.properties)
          ) {
            for (const property of securityDefinitionArgument.properties) {
              if (
                property.type !== 'Property' ||
                property.key?.type !== 'Identifier'
              ) {
                continue;
              }

              if (!tsoaSecurityDefinitions.includes(property.key.name)) {
                missingSecurityDefinitions.push(property.key.name);
              }
            }
          }

          if (missingSecurityDefinitions.length > 0) {
            context.report({
              node: decorator,
              messageId: 'securityDefinitionNotDefinedInConfig',
              data: {
                missingSecurityDefinitions:
                  missingSecurityDefinitions.join(', '),
              },
            });
          }
        }
      },
    };
  },
});
