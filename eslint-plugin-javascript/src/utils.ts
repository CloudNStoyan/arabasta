import { Rule } from 'eslint';
import type * as ESTree from 'estree';

export const PLUGIN_DOCS_URL =
  'https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-javascript/docs/rules';

export function parseOptions<Options>(
  context: Rule.RuleContext,
  defaultOptions: Options
) {
  const passedOptions = context.options[0] as Options | undefined;

  if (!passedOptions) {
    return defaultOptions;
  }

  const options: Options = Object.assign({}, defaultOptions);

  for (const optionName in options) {
    if (passedOptions[optionName] !== undefined) {
      options[optionName] = passedOptions[optionName];
    }
  }

  return options;
}

export function getFullFunctionName(node: ESTree.Expression | ESTree.Super) {
  if (node.type === 'Identifier') {
    return node.name;
  }

  const functionPath = [];

  let currentNode: ESTree.Expression | ESTree.Super = node;

  while (currentNode.type === 'MemberExpression' && currentNode.object) {
    if ('name' in currentNode.property) {
      functionPath.push(currentNode.property.name);
    }

    currentNode = currentNode.object;
  }

  if (currentNode.type === 'Identifier' && currentNode.name) {
    functionPath.push(currentNode.name);
  }

  if (currentNode.type === 'ThisExpression') {
    functionPath.push('this');
  }

  if (currentNode.type === 'Super') {
    functionPath.push('super');
  }

  functionPath.reverse();

  const functionName = functionPath.join('.');

  return functionName;
}
