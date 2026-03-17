const { spawn } = require('node:child_process');
const process = require('node:process');

const excludePatterns = ['!**/*.local', '!**/.idea/**'];

const child = spawn(
  'git',
  ['clean', '-dfX', ...excludePatterns.flatMap((x) => ['-e', x])],
  {
    stdio: ['inherit', 'pipe', 'pipe'],
  }
);

child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
child.on('close', process.exit);
child.on('error', (error) => {
  throw new Error(`Failed to spawn process.`, { cause: error });
});
