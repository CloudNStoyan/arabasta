import { getFullFunctionName, PLUGIN_DOCS_URL } from '../utils';
import type { Rule } from 'eslint';

const defaultRuleOptions = {
  reportFunctionName: 'console.error',
};

const rule: Rule.RuleModule = {
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
      description: 'require caught errors to be reported',
      recommended: true,
      url: `${PLUGIN_DOCS_URL}/report-caught-error.md`,
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          reportFunctionName: {
            type: 'string',
            description: 'The function name that is used to report errors',
          },
        },
      },
    ],
  },
  create(context) {
    const { reportFunctionName } = context.options[0] || defaultRuleOptions;

    return {
      CatchClause(node) {
        if (node.param && node.param.type === 'Identifier' && node.param.name) {
          const blockStatement = node.body;

          const body = blockStatement.body;
          const firstStatement = body[0];

          const errorIdentifierName = node.param.name;

          if (
            !(
              blockStatement &&
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
                functionName: reportFunctionName,
              },
              suggest: [
                {
                  messageId: 'addReportError',
                  data: {
                    functionName: reportFunctionName,
                    errorIdentifierName,
                  },
                  fix: (fixer) => {
                    return fixer.insertTextBeforeRange(
                      [blockStatement.range![0] + 1, blockStatement.range![1]],
                      ` ${reportFunctionName}(${errorIdentifierName});`
                    );
                  },
                },
              ],
            });
            return;
          }

          const firstStatementExpressionCallee =
            firstStatement.expression.callee;

          const fullFunctionName = getFullFunctionName(
            firstStatementExpressionCallee
          );

          if (fullFunctionName !== reportFunctionName) {
            context.report({
              node,
              messageId: 'functionNameIsNotValid',
              data: {
                correctFunctionName: reportFunctionName,
                incorrectFunctionName: fullFunctionName,
              },
              suggest: [
                {
                  messageId: 'fixFunctionName',
                  data: {
                    incorrectFunctionName: fullFunctionName,
                    correctFunctionName: reportFunctionName,
                  },
                  fix: (fixer) => {
                    return fixer.replaceText(
                      firstStatementExpressionCallee,
                      reportFunctionName
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
            if (
              firstStatementArguments[0] &&
              'name' in firstStatementArguments[0]
            ) {
              const firstStatementArgumentName =
                firstStatementArguments[0].name;

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
                      incorrectArgumentName: firstStatementArgumentName,
                      correctArgumentName: errorIdentifierName,
                    },
                    fix: (fixer) => {
                      return fixer.replaceText(
                        firstStatementArguments[0],
                        errorIdentifierName
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
                    functionName: reportFunctionName,
                    errorIdentifierName,
                  },
                  fix: (fixer) => {
                    return fixer.replaceText(
                      firstStatement.expression,
                      `${reportFunctionName}(${errorIdentifierName})`
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

export default rule;
