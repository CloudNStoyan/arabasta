const fs = require('node:fs/promises');
const path = require('node:path');

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

  await fs.writeFile(
    path.join(__dirname, 'generated', 'supported-ts-versions.txt'),
    line
      .replaceAll(mark, '')
      .replace(/[;']+$/, '')
      .replace(/^'+/, '')
  );
}

module.exports = { extractSupportedTsVersion };
