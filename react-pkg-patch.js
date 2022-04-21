const fs = require('fs');

let filePath = '';
let newFilePath = '';

// lodash-webpack-plugin https://github.com/lodash/lodash-webpack-plugin/pull/173 这个问题修复
filePath = './node_modules/lodash-webpack-plugin/lib/index.js';
newFilePath = './node_modules_bak/lodash-webpack-plugin/lib/index.js';
fs.writeFileSync(filePath, fs.readFileSync(newFilePath, 'utf8'));

console.log('\x1B[32m%s\x1B[0m', 'lodash-webpack-plugin was patched!');

