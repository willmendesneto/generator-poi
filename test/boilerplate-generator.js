const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const { version: pkgVersion } = require('../package.json');

describe('Generator POI boilerplate: bootstrap', () => {
  const promtArgs = {
    reactComponent: 'test-boilerplate',
    description: 'My description',
    team: 'My Team',
    author: 'John Doe',
    autoLoad: false,
    updateScripts: false,
  };

  before(() => helpers.run(require.resolve('../app')).withPrompts(promtArgs));

  it('should create a `package.json` file with given data', () => {
    assert.jsonFileContent('package.json', {
      name: promtArgs.reactComponent,
      generatorVersion: pkgVersion,
      description: promtArgs.description,
      author: promtArgs.author,
      repository: {
        url: `git+ssh://git@github.com/willmendesneto/${promtArgs.reactComponent}.git`,
      },
      bugs: {
        url: `https://github.com/willmendesneto/${promtArgs.reactComponent}/issues`,
      },
      homepage: `https://github.com/willmendesneto/${promtArgs.reactComponent}#readme`,
    });
  });

  it('should create a `README.md` file with given data', () => {
    assert.fileContent('.nvmrc', 'v8.9.1');
  });

  it('should create a `README.md` file with given data', () => {
    assert.fileContent('README.md', promtArgs.description);
    assert.fileContent('README.md', promtArgs.reactComponent);
    assert.fileContent(
      'README.md',
      `https://github.com/willmendesneto/generator-poi/tree/v${pkgVersion}#code-architecture`,
    );
  });

  it('should create configuration files', () => {
    assert.file([
      '.babelrc',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.npmignore',
      '.yo-rc.json',
      'CHANGELOG.md',
      '.nvmrc',
      '.gitignore',
      '.npmignore',
      'package.json',
    ]);
  });

  it('should create configuration files from libraries', () => {
    assert.file(['src/js/export.js', 'index-library.js', 'index.ejs', 'poi.config.library.js']);
  });

  it('should create configuration files from pages', () => {
    assert.file(['storybook/addons.js', 'storybook/config.js', 'index.js', 'poi.config.js']);
  });

  it('should create test setup files', () => {
    assert.file([`tests/unit/${promtArgs.reactComponent}.spec.js`, 'tests/setup.js']);
  });

  it('should create src content files', () => {
    assert.file([
      'src/js/export.js',
      `src/js/components/${promtArgs.reactComponent}.js`,
      'src/scss/styles.scss',
    ]);
  });
});
