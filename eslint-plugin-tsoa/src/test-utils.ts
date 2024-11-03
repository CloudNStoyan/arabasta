/**
 * A string template tag that removes padding from the left side of multi-line strings
 * @param strings array of code strings (only one expected)
 */
export function normalizeIndent(strings: TemplateStringsArray) {
  const codeLines = strings[0].split('\n');
  const leftPadding = codeLines[1].match(/\s+/)![0];
  return codeLines.map((line) => line.slice(leftPadding.length)).join('\n');
}
