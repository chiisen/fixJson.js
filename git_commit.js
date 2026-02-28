const { execSync } = require('child_process');
const path = 'D:\\github\\chiisen\\fixJson.js';

try {
  console.log('Running git status...');
  const status = execSync('git status', { cwd: path, encoding: 'utf8' });
  console.log(status);
  
  console.log('Running git add -A...');
  execSync('git add -A', { cwd: path, encoding: 'utf8' });
  
  console.log('Running git commit...');
  execSync('git commit -m "feat: add TypeScript types and ESM support"', { cwd: path, encoding: 'utf8' });
  
  console.log('Running git push...');
  execSync('git push', { cwd: path, encoding: 'utf8' });
  
  console.log('Done!');
} catch (e) {
  console.error('Error:', e.message);
  if (e.stdout) console.log('stdout:', e.stdout);
  if (e.stderr) console.log('stderr:', e.stderr);
}
