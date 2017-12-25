#! /usr/bin/env node
const { execSync } = require('child_process');

try {
    execSync('node_modules/.bin/update-yeoman-generator --generator willmendesneto/generator-poi --ejs-open 0_- --ejs-close -_0');
} catch (error) {
    console.log(error);
    process.exit(1);
}