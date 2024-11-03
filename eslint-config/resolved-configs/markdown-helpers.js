function replaceSection(commentName, mdContents, mdSection) {
  const startComment = `<!-- start generated block (${commentName}) -->`;
  const endComment = `<!-- end generated block (${commentName}) -->`;

  const lines = mdContents.split('\n');

  const startCommentIndex = lines.findIndex((x) => x.trim() === startComment);

  if (startCommentIndex === -1) {
    throw new Error(`"start generated block" for "${commentName}" not found.`);
  }

  const endCommentIndex = lines.findIndex((x) => x.trim() === endComment);

  if (endCommentIndex === -1) {
    throw new Error(`"end generated block" for "${commentName}" not found.`);
  }

  const result = [
    ...lines.slice(0, startCommentIndex + 1),
    ...mdSection.split('\n'),
    ...lines.slice(endCommentIndex),
  ];

  return result.join('\n');
}

module.exports = { replaceSection };
