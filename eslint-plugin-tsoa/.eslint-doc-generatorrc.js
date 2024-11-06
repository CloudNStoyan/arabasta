const path = require('path');
const { compile } = require('json-schema-to-typescript');
const prettier = require('prettier');

/**
 * Our custom post processing of the
 * generated eslint documentation.
 * @param {string} content
 * @param {string} pathToFile
 */
async function customPostprocessing(content, pathToFile) {
  const relativePathToFile = path.relative('.', pathToFile);

  // We only want to postprocess rule docs
  if (!relativePathToFile.startsWith('docs/rules')) {
    return content;
  }

  const START_OPTIONS_MARK_LINE =
    '<!-- start custom auto-generated options codeblock -->';

  const END_OPTIONS_MARK_LINE =
    '<!-- end custom auto-generated options codeblock -->';

  if (
    !(
      content.includes(START_OPTIONS_MARK_LINE) &&
      content.includes(END_OPTIONS_MARK_LINE)
    )
  ) {
    return content;
  }

  const eslintRuleName = path.basename(relativePathToFile, '.md');

  const ruleData = require('./dist/rules/' + eslintRuleName).default;

  if (ruleData.meta.schema.length !== 1) {
    return content;
  }

  const compiledTypescript = await compile(ruleData.meta.schema[0], 'Option', {
    bannerComment: false,
  });

  const typescriptCodeSnippet = `
\`\`\`ts
type Options = [
${compiledTypescript
  .replace('export interface Option', '')
  .split('\n')
  .map((line) => `  ${line}`)
  .filter((line) => Boolean(line.trim()))
  .join('\n')}
];

const defaultOptions: Options = ${JSON.stringify(ruleData.defaultOptions, null, 2)}
\`\`\`
`.trim();

  const lines = content.split('\n');

  const newLines = [];

  let ignoreLines = false;

  for (const line of lines) {
    if (line === START_OPTIONS_MARK_LINE) {
      ignoreLines = true;
    }

    if (!ignoreLines) {
      newLines.push(line);
    }

    if (line === END_OPTIONS_MARK_LINE) {
      newLines.push(START_OPTIONS_MARK_LINE);
      newLines.push(typescriptCodeSnippet);
      newLines.push(END_OPTIONS_MARK_LINE);
      ignoreLines = false;
    }
  }

  return newLines.join('\n');
}

/** @type {import('eslint-doc-generator').GenerateOptions} */
const config = {
  ignoreConfig: ['recommended-legacy'],
  ruleDocTitleFormat: 'name',
  ruleDocNotices: [
    'deprecated',
    'description',
    'configs',
    'options',
    'fixableAndHasSuggestions',
    'requiresTypeChecking',
  ],
  ruleDocSectionOptions: false,
  postprocess: async (content, pathToFile) => {
    // This gets the prettier options that we normally have configured for the whole repo,
    // `markdown.md` is just a dummy path for prettier to generate the correct options for.
    const prettierOptions = await prettier.resolveConfig('markdown.md');

    const formatted = await prettier.format(
      await customPostprocessing(content, pathToFile),
      { ...prettierOptions, parser: 'markdown' }
    );

    return formatted;
  },
};

module.exports = config;
