const fs = require('node:fs/promises');
const path = require('node:path');

async function getFilesRecursively(inputDirectory, result = []) {
  const directoryEntries = await fs.readdir(inputDirectory);
  for (const directoryEntry of directoryEntries) {
    const filePath = path.join(inputDirectory, directoryEntry);
    if ((await fs.stat(filePath)).isDirectory()) {
      await getFilesRecursively(filePath, result);
    } else {
      result.push(`./${filePath}`);
    }
  }

  return result;
}

async function createPluginsFile() {
  const files = (await getFilesRecursively('./resolved-configs/generated')).map(
    (x) => path.resolve(x)
  );

  for (const filePath of files) {
    if (path.parse(filePath).ext !== '.json') {
      // eslint-disable-next-line no-continue
      continue;
    }

    const fileContent = await fs.readFile(filePath, 'utf-8');
    const resolved = JSON.parse(fileContent.toString());

    const globalsFilePath = `${path.join(path.dirname(filePath), path.parse(filePath).name)}.globals.json`;

    let globals;

    if (resolved?.languageOptions?.globals) {
      globals = resolved.languageOptions.globals;
      delete resolved.languageOptions.globals;
    }

    await fs.writeFile(filePath, JSON.stringify(resolved, null, 2));

    if (globals) {
      await fs.writeFile(globalsFilePath, JSON.stringify(globals, null, 2));
    }
  }
}

void createPluginsFile();
