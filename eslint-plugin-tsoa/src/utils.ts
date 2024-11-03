import { TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';
import ts from 'typescript';

type NodeWithDecorator =
  | TSESTree.ClassDeclaration
  | TSESTree.MethodDefinition
  | TSESTree.AccessorProperty
  | TSESTree.PropertyDefinition
  | TSESTree.Parameter;

const PLUGIN_DOCS_URL =
  'https://github.com/CloudNStoyan/arabasta/blob/main/eslint-plugin-api-documentation/docs/rules';

export interface ApiDocumentationRuleDocs {
  description: string;
  recommended?: boolean;
  requiresTypeChecking?: boolean;
}

export const createRule = ESLintUtils.RuleCreator<ApiDocumentationRuleDocs>(
  (name) => `${PLUGIN_DOCS_URL}/${name}.md`
);

const HTTP_METHOD_DECORATOR_NAMES = [
  'Options',
  'Get',
  'Post',
  'Put',
  'Patch',
  'Delete',
  'Head',
];

export function isTypeEnum(type: ts.Type) {
  return type.symbol?.flags & ts.SymbolFlags.Enum;
}

export function hasHttpMethodDecorator(node: TSESTree.MethodDefinition) {
  for (const httpMethodDecoratorName of HTTP_METHOD_DECORATOR_NAMES) {
    if (
      hasDecoratorWithName({ node, decoratorName: httpMethodDecoratorName })
    ) {
      return true;
    }
  }

  return false;
}

export function getFullFunctionName(node: TSESTree.Expression) {
  if (node.type === 'Identifier') {
    return node.name;
  }

  const functionPath = [];

  let currentNode: TSESTree.Expression = node;

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

  functionPath.reverse();

  const functionName = functionPath.join('.');

  return functionName;
}

export function hasDecoratorWithName({
  node,
  decoratorName,
}: {
  node: TSESTree.MethodDefinition | TSESTree.ClassDeclaration;
  decoratorName: string;
}) {
  if (!Array.isArray(node?.decorators)) {
    return false;
  }
  for (const decorator of node.decorators) {
    if (decorator?.type !== 'Decorator') {
      continue;
    }

    if (
      decorator.expression.type === 'Identifier' &&
      decorator.expression.name === decoratorName
    ) {
      return true;
    }

    if (
      decorator.expression.type === 'CallExpression' &&
      decorator.expression.callee?.type === 'Identifier' &&
      decorator.expression.callee.name === decoratorName
    ) {
      return true;
    }
  }

  return false;
}

export function hasResponseDecoratorWithStatus({
  status,
  decorators,
}: {
  status: number;
  decorators: TSESTree.Decorator[];
}) {
  for (const decorator of decorators) {
    if (decorator.expression.type !== 'CallExpression') {
      continue;
    }

    const decoratorArguments = decorator.expression.arguments;

    if (!Array.isArray(decoratorArguments) || decoratorArguments.length === 0) {
      continue;
    }

    const firstDecoratorArgument = decoratorArguments[0];
    if (
      'value' in firstDecoratorArgument &&
      firstDecoratorArgument.value === status
    ) {
      return true;
    }
  }

  return false;
}

export function getAllDecoratorsWithName({
  node,
  decoratorName,
}: {
  node: NodeWithDecorator;
  decoratorName: string;
}) {
  if (!Array.isArray(node?.decorators)) {
    return [];
  }

  const decorators = [];

  for (const decorator of node.decorators) {
    if (
      decorator?.type !== 'Decorator' ||
      decorator.expression.type !== 'CallExpression' ||
      decorator.expression.callee?.type !== 'Identifier'
    ) {
      continue;
    }

    if (decorator.expression.callee.name !== decoratorName) {
      continue;
    }

    decorators.push(decorator);
  }

  return decorators;
}
