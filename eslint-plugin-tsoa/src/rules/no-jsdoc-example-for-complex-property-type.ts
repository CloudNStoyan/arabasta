import { ESLintUtils } from '@typescript-eslint/utils';
import { createRule, parseJSDoc, isTypeEnum } from '../utils';

type RuleOptions = [
  {
    allowEnums?: boolean;
  },
];

type RuleMessageIds = 'complexExamplesAreForbidden';

export default createRule<RuleOptions, RuleMessageIds>({
  name: 'no-jsdoc-example-for-complex-property-type',
  meta: {
    messages: {
      complexExamplesAreForbidden:
        "Using JSDoc '@example' on a complex property type is forbidden",
    },
    type: 'problem',
    docs: {
      description:
        "ban complex interface property types from having JSDoc's `@example` declaration",
      recommended: true,
      requiresTypeChecking: true,
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          allowEnums: {
            type: 'boolean',
            description:
              "Whether to allow JSDoc's '@example' declaration for enum properties on interfaces.",
          },
        },
      },
    ],
  },
  defaultOptions: [
    {
      allowEnums: true,
    },
  ],
  create: (context, [{ allowEnums }]) => {
    const services = ESLintUtils.getParserServices(context);
    const sourceCode = context.sourceCode || context.getSourceCode();

    return {
      TSPropertySignature(node) {
        if (
          !node.typeAnnotation ||
          node.typeAnnotation.typeAnnotation.type !== 'TSTypeReference'
        ) {
          return;
        }

        const propertyType = services.getTypeAtLocation(node);

        const { jsdoc } = parseJSDoc(sourceCode, node);

        if (!jsdoc) {
          return;
        }

        const targetTagName = 'example';

        const propertyExamples = jsdoc.tags.filter(({ tag }) => {
          return tag === targetTagName;
        });

        if (allowEnums && isTypeEnum(propertyType)) {
          return;
        }

        if (propertyExamples.length > 0) {
          context.report({
            node,
            messageId: 'complexExamplesAreForbidden',
          });
        }
      },
    };
  },
});
