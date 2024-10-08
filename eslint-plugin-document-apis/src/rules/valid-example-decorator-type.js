import { getTypeName, isPromiseLike } from '@typescript-eslint/type-utils';
import { ESLintUtils } from '@typescript-eslint/utils';
import { getAllDecoratorsWithName } from '../utils.js';

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    messages: {
      wrongFirstTypeArg:
        "The first type argument of the Example decorator should be the same as method's return type '{{ correctType }}'",
    },
    type: 'problem',
    docs: {
      description:
        "Enforce that Example's first type argument is the same as its method's return type.",
      recommended: true,
    },
    schema: [],
  },
  create: (context) => {
    const services = ESLintUtils.getParserServices(context);
    const checker = services.program.getTypeChecker();

    function getFunctionReturnTypeName(node) {
      const signatures = services.getTypeAtLocation(node).getCallSignatures();

      if (!signatures.length) {
        return;
      }

      const methodReturnType = checker.getReturnTypeOfSignature(signatures[0]);

      if (
        isPromiseLike(services.program, methodReturnType) &&
        Array.isArray(methodReturnType.resolvedTypeArguments) &&
        methodReturnType.resolvedTypeArguments.length === 1 &&
        methodReturnType.resolvedTypeArguments[0]
      ) {
        return getTypeName(checker, methodReturnType.resolvedTypeArguments[0]);
      }

      return getTypeName(checker, methodReturnType);
    }

    function getPropertyTypeName(node) {
      const propertyType = node.typeAnnotation.typeAnnotation;

      if (
        propertyType.type === 'TSTypeReference' &&
        propertyType.typeName?.name
      ) {
        return propertyType.typeName.name;
      }

      const type = services.getTypeAtLocation(node);
      return getTypeName(checker, type);
    }

    return {
      PropertyDefinition(node) {
        const propertyTypeName = getPropertyTypeName(node);

        const decorators = getAllDecoratorsWithName({
          node,
          decoratorName: 'Example',
        });

        for (const decorator of decorators) {
          if (decorator.expression.type !== 'CallExpression') {
            continue;
          }

          const typeArguments = decorator.expression.typeArguments;

          if (
            !(
              typeArguments &&
              typeArguments.type === 'TSTypeParameterInstantiation' &&
              Array.isArray(typeArguments.params) &&
              typeArguments.params.length > 0 &&
              typeArguments.params[0]
            )
          ) {
            context.report({
              node,
              messageId: 'wrongFirstTypeArg',
              data: {
                correctType: propertyTypeName,
              },
            });
            continue;
          }

          const firstTypeArg = typeArguments.params[0];

          if (
            firstTypeArg.type === 'TSTypeReference' &&
            firstTypeArg.typeName?.name
          ) {
            const firstTypeArgTypeName = firstTypeArg.typeName.name;

            if (firstTypeArgTypeName !== propertyTypeName) {
              context.report({
                node,
                messageId: 'wrongFirstTypeArg',
                data: {
                  correctType: propertyTypeName,
                },
              });
            }

            continue;
          }

          const firstTypeArgCompiledTypeName = getTypeName(
            checker,
            services.getTypeAtLocation(firstTypeArg)
          );

          if (firstTypeArgCompiledTypeName !== propertyTypeName) {
            context.report({
              node,
              messageId: 'wrongFirstTypeArg',
              data: {
                correctType: propertyTypeName,
              },
            });
          }
        }
      },
      MethodDefinition(node) {
        const returnTypeName = getFunctionReturnTypeName(node);
        const decorators = getAllDecoratorsWithName({
          node,
          decoratorName: 'Example',
        });

        for (const decorator of decorators) {
          if (decorator.expression.type !== 'CallExpression') {
            continue;
          }

          const typeArguments = decorator.expression.typeArguments;

          if (
            !(
              typeArguments &&
              typeArguments.type === 'TSTypeParameterInstantiation' &&
              Array.isArray(typeArguments.params) &&
              typeArguments.params.length > 0 &&
              typeArguments.params[0]
            )
          ) {
            context.report({
              node,
              messageId: 'wrongFirstTypeArg',
              data: {
                correctType: returnTypeName,
              },
            });
            continue;
          }

          const firstTypeParamTypeName = getTypeName(
            checker,
            services.getTypeAtLocation(typeArguments.params[0])
          );

          if (firstTypeParamTypeName !== returnTypeName) {
            context.report({
              node,
              messageId: 'wrongFirstTypeArg',
              data: {
                correctType: returnTypeName,
              },
            });
          }
        }
      },
    };
  },
};
