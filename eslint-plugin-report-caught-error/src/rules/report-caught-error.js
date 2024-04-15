'use strict';

const DEFAULT_REPORT_FUNCTION = 'console.error';

/** @param {import('eslint').Rule.Node} node */
function getFullFunctionName(node) {
  if (node.type === 'Identifier' && !node.object) {
    return node.name;
  }

  const functionPath = [];

  let currentNode = node;

  while (currentNode.type === 'MemberExpression' && currentNode.object) {
    functionPath.push(currentNode.property.name);
    currentNode = currentNode.object;
  }

  if (currentNode.type === 'Identifier' && currentNode.name) {
    functionPath.push(currentNode.name);
  }

  functionPath.reverse();

  const functionName = functionPath.join('.');

  return functionName;
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    messages: {
      firstStatementMustBeFunction:
        "The first statement of a catch block should be '{{ functionName }}'.",
      functionNameIsNotValid:
        "'{{ incorrectFunctionName }}' is not the correct report function, it should be '{{ correctFunctionName }}'.",
      functionShouldHaveArg:
        "'{{ functionName }}' should have the error passed as a first argument.",
      addReportError:
        "Add '{{ functionName }}({{ errorIdentifierName }})' to the body of the catch block.",
      fixFunctionName:
        "Replace '{{ incorrectFunctionName }}' with '{{ correctFunctionName}}'.",
      fixArgumentName:
        "Replace '{{ incorrectArgumentName }}' with '{{ correctArgumentName}}'.",
      addArgument:
        "Add '{{ errorIdentifierName }}' to '{{ functionName }}' as the first argument.",
    },
    type: 'problem',
    hasSuggestions: true,
    docs: {
      description: 'Enforce that caught errors are reported.',
      recommended: true,
    },
    schema: [{ type: 'string' }],
  },
  create(context) {
    const ALLOWED_FUNCTION_NAME = context.options[0] || DEFAULT_REPORT_FUNCTION;

    return {
      CatchClause(node) {
        if (node.param && node.param.type === 'Identifier' && node.param.name) {
          const body = node.body.body;
          const firstStatement = body[0];

          if (
            !(
              body &&
              body.length &&
              firstStatement &&
              firstStatement.type === 'ExpressionStatement' &&
              firstStatement.expression.type === 'CallExpression' &&
              firstStatement.expression.callee
            )
          ) {
            context.report({
              node,
              messageId: 'firstStatementMustBeFunction',
              data: {
                functionName: ALLOWED_FUNCTION_NAME,
              },
              suggest: [
                {
                  messageId: 'addReportError',
                  data: {
                    functionName: ALLOWED_FUNCTION_NAME,
                    errorIdentifierName: node.param.name,
                  },
                  fix: (fixer) => {
                    return fixer.insertTextBeforeRange(
                      [node.body.range[0] + 1, node.body.range[1]],
                      ` ${ALLOWED_FUNCTION_NAME}(${node.param.name});`
                    );
                  },
                },
              ],
            });
            return;
          }

          const fullFunctionName = getFullFunctionName(
            firstStatement.expression.callee
          );

          if (fullFunctionName !== ALLOWED_FUNCTION_NAME) {
            context.report({
              node,
              messageId: 'functionNameIsNotValid',
              data: {
                correctFunctionName: ALLOWED_FUNCTION_NAME,
                incorrectFunctionName: fullFunctionName,
              },
              suggest: [
                {
                  messageId: 'fixFunctionName',
                  data: {
                    incorrectFunctionName: fullFunctionName,
                    correctFunctionName: ALLOWED_FUNCTION_NAME,
                  },
                  fix: (fixer) => {
                    return fixer.replaceText(
                      firstStatement.expression.callee,
                      ALLOWED_FUNCTION_NAME
                    );
                  },
                },
              ],
            });
            return;
          }

          const firstStatementArguments = firstStatement.expression.arguments;

          if (
            !(
              firstStatementArguments &&
              firstStatementArguments.length &&
              firstStatementArguments[0] &&
              firstStatementArguments[0].type === 'Identifier' &&
              firstStatementArguments[0].name === node.param.name
            )
          ) {
            if (firstStatementArguments[0]) {
              context.report({
                node,
                messageId: 'functionShouldHaveArg',
                data: {
                  functionName: fullFunctionName,
                },
                suggest: [
                  {
                    messageId: 'fixArgumentName',
                    data: {
                      incorrectArgumentName: firstStatementArguments[0].name,
                      correctArgumentName: node.param.name,
                    },
                    fix: (fixer) => {
                      return fixer.replaceText(
                        firstStatementArguments[0],
                        node.param.name
                      );
                    },
                  },
                ],
              });
              return;
            }

            context.report({
              node,
              messageId: 'functionShouldHaveArg',
              data: {
                functionName: fullFunctionName,
              },
              suggest: [
                {
                  messageId: 'addArgument',
                  data: {
                    errorIdentifierName: node.param.name,
                    functionName: ALLOWED_FUNCTION_NAME,
                  },
                  fix: (fixer) => {
                    return fixer.replaceText(
                      firstStatement.expression,
                      `${ALLOWED_FUNCTION_NAME}(${node.param.name})`
                    );
                  },
                },
              ],
            });
            return;
          }
        }
      },
    };
  },
};
