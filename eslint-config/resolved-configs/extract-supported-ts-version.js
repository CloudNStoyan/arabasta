const fs = require('node:fs/promises');
const path = require('node:path');

const { replaceSection } = require('./markdown-helpers');

async function updateReadmeTypescriptVersionNotice(
  typescriptVersionSectionContents
) {
  const filePath = path.join(__dirname, '../', 'README.md');

  const readmeContent = (await fs.readFile(filePath)).toString();

  const updatedReadme = replaceSection(
    'required-typescript-version',
    readmeContent,
    typescriptVersionSectionContents
  );

  await fs.writeFile(filePath, updatedReadme);
}

async function updatePackageJSON(constraint) {
  const filePath = path.join(__dirname, '../', 'package.json');

  const packageJSONContent = (await fs.readFile(filePath)).toString();

  const packageJSONObject = JSON.parse(packageJSONContent);

  packageJSONObject.peerDependencies.typescript = constraint;

  const updatePackageJSONContent = JSON.stringify(packageJSONObject, null, 2);

  await fs.writeFile(filePath, updatePackageJSONContent);
}

async function extractSupportedTsVersion() {
  const fileContents = (
    await fs.readFile(
      path.join(
        __dirname,
        '../',
        './node_modules/@typescript-eslint/typescript-estree/dist/parseSettings/warnAboutTSVersion.js'
      )
    )
  ).toString();

  const lines = fileContents.split('\n');

  const mark = 'const SUPPORTED_TYPESCRIPT_VERSIONS = ';

  const line = lines.find((x) => x.startsWith(mark));

  const constraint = line
    .replaceAll(mark, '')
    .replace(/[;']+$/, '')
    .replace(/^'+/, '');

  await fs.writeFile(
    path.join(__dirname, 'generated', 'supported-ts-versions.txt'),
    constraint
  );

  await updatePackageJSON(constraint);

  await updateReadmeTypescriptVersionNotice(
    '- The optional TypeScript config requires a `typescript` version ' +
      `that satisfies the following constraint: \`${constraint}\`\n`
  );
}

module.exports = { extractSupportedTsVersion };
