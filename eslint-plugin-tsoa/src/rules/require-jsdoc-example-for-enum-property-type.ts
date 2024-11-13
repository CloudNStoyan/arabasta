import { ESLintUtils } from '@typescript-eslint/utils';
import { createRule, parseJSDoc, isTypeEnum } from '../utils';
import ts from 'typescript';

export default createRule({
  name: 'require-jsdoc-example-for-enum-property-type',
  meta: {
    messages: {
      exampleIsMissing: "Missing JSDoc '@example' declaration",
      exampleDescriptionIsMissing: "Missing JSDoc '@example' description",
      exampleValueIsNotValid: "JSDoc '@example' contains invalid enum value",
    },
    type: 'problem',
    docs: {
      description: "require JSDoc's `@example` declaration for enum properties",
      recommended: true,
      requiresTypeChecking: true,
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => {
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

        if (!isTypeEnum(propertyType)) {
          return;
        }

        if (propertyExamples.length === 0) {
          context.report({
            node,
            messageId: 'exampleIsMissing',
          });
          return;
        }

        const enumValues = propertyType.symbol.exports;

        for (const example of propertyExamples) {
          const description = example.description.trim();

          if (description.length === 0) {
            context.report({
              node,
              messageId: 'exampleDescriptionIsMissing',
            });
            continue;
          }

          if (!description.startsWith('"') || !description.endsWith('"')) {
            continue;
          }

          const exampleEnumValue = description.substring(
            1,
            description.length - 1
          );

          if (enumValues && !enumValues.has(exampleEnumValue as ts.__String)) {
            context.report({
              node,
              messageId: 'exampleValueIsNotValid',
            });
          }
        }
      },
    };
  },
});
