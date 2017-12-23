const ejs = require('ejs');
const pascalcase = require('../../util/pascalcase');
const { feCoize, unFeCoize } = require('../../util/fe-co');
const { FILE_DELIM_OPEN, FILE_DELIM_CLOSE } = require('../../util/ejs-util');

const templateRe = /^app\/templates\//;

module.exports = {
  isYeomanTemplate: filename => (filename.match(templateRe) !== null),

  makeProps: (packageJson) => {
    const packageName = packageJson.name.split('/').slice(-1)[0];
    return {
      reactComponent: feCoize(packageName),
      component: unFeCoize(packageName),
      componentCC: pascalcase(unFeCoize(packageName)),
      generatorVersion: packageJson.generatorVersion,
      author: packageJson.author,
      description: packageJson.description,
    };
  },

  renderBoilerplateFilename: (filename, props) => {
    // Remove yeoman template path from filename
    let boilerplateFilename = filename.replace(templateRe, '')
      // Normalize ejs template strings
      .replace(FILE_DELIM_OPEN, '<%')
      .replace(FILE_DELIM_CLOSE, '%>');

    // render it through ejs
    boilerplateFilename = ejs.render(boilerplateFilename, props);

    // Add dots to gitignore and npmignore
    boilerplateFilename = boilerplateFilename.replace(/(^|\/)gitignore$/, '$1.gitignore');
    boilerplateFilename = boilerplateFilename.replace(/(^|\/)npmignore$/, '$1.npmignore');

    return boilerplateFilename;
  },
};
