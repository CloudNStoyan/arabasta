import { getFullFunctionName, parseOptions, PLUGIN_DOCS_URL } from '../utils';
import type { Rule } from 'eslint';

interface RuleOptions {
  reportFunctionName: string;
  shouldPassErrorToFunction: boolean;
}

const defaultRuleOptions: RuleOptions = {
  reportFunctionName: 'console.error',
  shouldPassErrorToFunction: true,
};

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      firstStatementMustBeFunction:
        "The first statement of a catch block should be '{{ functionName }}'.",
      functionShouldHaveArg:
        "'{{ functionName }}' should have the error passed as a first argument.",
      addReportError:
        "Add '{{ functionName }}()' to the body of the catch block.",
      addReportErrorWithArgument:
        "Add '{{ functionName }}({{ errorIdentifierName }})' to the body of the catch block.",
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
          shouldPassErrorToFunction: {
            type: 'boolean',
            description:
              'Whether or not to require the error identifier to be passed as first argument to the report function.',
          },
        },
      },
    ],
  },
  create(context) {
    const { reportFunctionName, shouldPassErrorToFunction } = parseOptions(
      context,
      defaultRuleOptions
    );

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
            if (shouldPassErrorToFunction) {
              context.report({
                node,
                messageId: 'firstStatementMustBeFunction',
                data: {
                  functionName: reportFunctionName,
                },
                suggest: [
                  {
                    messageId: 'addReportErrorWithArgument',
                    data: {
                      functionName: reportFunctionName,
                      errorIdentifierName,
                    },
                    fix: (fixer) => {
                      return fixer.insertTextBeforeRange(
                        [
                          blockStatement.range![0] + 1,
                          blockStatement.range![1],
                        ],
                        ` ${reportFunctionName}(${errorIdentifierName});`
                      );
                    },
                  },
                ],
              });
              return;
            }

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
                      ` ${reportFunctionName}();`
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
              messageId: 'firstStatementMustBeFunction',
              data: {
                functionName: reportFunctionName,
              },
            });
            return;
          }

          if (!shouldPassErrorToFunction) {
            // we don't track if the error is passed to the function
            return;
          }

          const firstStatementArguments = firstStatement.expression.arguments;

          if (
            Array.isArray(firstStatementArguments) &&
            firstStatementArguments.length > 0
          ) {
            // the name of the first argument is the name of the error identifier
            const reportFunctionArgument = firstStatementArguments[0];
            if (
              reportFunctionArgument.type !== 'Identifier' ||
              reportFunctionArgument.name !== errorIdentifierName
            ) {
              context.report({
                node,
                messageId: 'functionShouldHaveArg',
                data: {
                  functionName: fullFunctionName,
                },
              });
            }
            return;
          }

          // report function doesn't have any arguments

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
        }
      },
    };
  },
};

export default rule;
