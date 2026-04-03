const fs = require('node:fs/promises');
const path = require('node:path');

const { replaceSection } = require('./markdown-helpers');

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

function addPluginPrefix(pluginName) {
  const eslintPluginPackagePrefix = 'eslint-plugin';
  if (pluginName.startsWith(eslintPluginPackagePrefix)) {
    return pluginName;
  }
  return `${eslintPluginPackagePrefix}-${pluginName}`;
}

function getPackageName(rawPlugin) {
  const packageNameOverwriteMap = new Map();
  packageNameOverwriteMap.set('eslint-plugin-vitest', '@vitest/eslint-plugin');

  if (rawPlugin.includes(':')) {
    const packageDefinition = rawPlugin.split(':')[1];
    const parts = packageDefinition.split('@');
    const pluginName = parts[0];

    if (pluginName === '') {
      parts.pop();
      return parts.join('@');
    }
    const packageName = addPluginPrefix(pluginName);
    return packageNameOverwriteMap.get(packageName) ?? packageName;
  }
  const packageName = addPluginPrefix(rawPlugin);
  return packageNameOverwriteMap.get(packageName) ?? packageName;
}

function getAllNpmPackages() {
  const lockJsonPackages = Object.entries(
    // eslint-disable-next-line global-require
    require('../package-lock.json').packages
  );
  const lockJsonPackagesMap = new Map();
  for (const [packageName, packageManifest] of lockJsonPackages) {
    lockJsonPackagesMap.set(
      packageName.replaceAll('node_modules/', ''),
      packageManifest
    );
  }
  return lockJsonPackagesMap;
}

function deduplicateArray(items) {
  return Array.from(new Set(items));
}

async function updateReadmePluginSection(pluginSectionContents) {
  const filePath = path.join(__dirname, '../', 'README.md');

  const readmeContent = (await fs.readFile(filePath)).toString();

  const updatedReadme = replaceSection(
    'plugin-packages',
    readmeContent,
    pluginSectionContents
  );

  await fs.writeFile(filePath, updatedReadme);
}

async function createPluginsFile() {
  const rawPlugins = (await getFilesRecursively('./resolved-configs/generated'))
    .filter((x) => x.endsWith('.resolved.json'))
    // eslint-disable-next-line global-require,import/no-dynamic-require
    .flatMap((x) => require(`./${path.relative(__dirname, x)}`).plugins);

  const packageNames = rawPlugins
    .filter((x) => x !== '@')
    .map(getPackageName)
    .toSorted();

  const lockJsonPackages = getAllNpmPackages();

  const pluginPackageLines = [];

  for (const packageName of deduplicateArray(packageNames)) {
    const packageManifest = lockJsonPackages.get(packageName);

    if (!packageManifest) {
      throw new Error(
        `ESLint plugin package "${packageName}" not found in package-lock.json`
      );
    } else {
      pluginPackageLines.push(`${packageName}`);
    }
  }

  const pluginSectionContents = `${pluginPackageLines.map((x) => `- ${x}`).join('\n')}\n`;

  await updateReadmePluginSection(pluginSectionContents);
}

module.exports = { createPluginsFile };
