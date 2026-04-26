const fs = require('fs');
const files = [
  '@rsbuild/core/compiled/postcss-load-config/index.js',
  '@rsbuild/core/dist/index.cjs',
  'rspress/dist/index.js',
];
files.forEach(file => {
  try {
    const p = require.resolve(file);
    let c = fs.readFileSync(p, 'utf8');
    const orig = c;
    c = c.replace(/process\.env\.NODE_ENV\s*=\s*env/g, 'var __env = env');
    c = c.replace(/process\.env\.NODE_ENV\s*=\s*"development"/g, 'var __env = "development"');
    if (c !== orig) {
      fs.writeFileSync(p, c);
      console.log('patched:', file);
    }
  } catch(e) {
    console.log('skip:', file);
  }
});
