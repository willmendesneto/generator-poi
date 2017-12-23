const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const pkgVersion = require('../package.json').version;

describe('Generator POI boilerplate: bootstrap', () => {

  const promtArgs = {
    reactComponent: 'test-boilerplate',
    description: 'My description',
    basePath: 'test-server-basepath',
    team: 'My Team',
    author: 'John Doe',
    autoLoad: false,
  };

  before(() =>
    helpers.run(require.resolve('../app'))
            .withPrompts(promtArgs)
  );

  it('should create a `package.json` file with given data', () => {
    assert.jsonFileContent('package.json', {
      name: `fe-co-${promtArgs.reactComponent}`,
      generatorVersion: pkgVersion,
      description: promtArgs.description,
      author: promtArgs.author,
      repository: {
        url: `git+ssh://git@github.com/willmendesneto/fe-co-${promtArgs.reactComponent}.git`,
      },
      bugs: {
        url: `https://github.com/willmendesneto/fe-co-${promtArgs.reactComponent}/issues`,
      },
      homepage: `https://github.com/willmendesneto/fe-co-${promtArgs.reactComponent}#readme`,
    });
  });

  it('should create a `README.md` file with given data', () => {
    assert.fileContent('README.md', promtArgs.description);
    assert.fileContent('README.md', promtArgs.reactComponent);
    assert.fileContent('README.md', `https://github.com/willmendesneto/generator-poi-boilerplate/tree/v${pkgVersion}#code-architecture`);
  });

  it('should create configuration files', () => {
    assert.file('.babelrc');
    assert.file('.editorconfig');
    assert.file('.gitattributes');
    assert.file('.gitignore');
    assert.file('.npmignore');
    assert.file('CHANGELOG.md');
    assert.file('.nvmrc');
    assert.file('.gitignore');
    assert.file('.npmignore');
    assert.file('package.json');
  });

  it('should create test setup files', () => {
    assert.file(`test/unit/${promtArgs.reactComponent}.js`);
    assert.file('test/setup.js');
  });

  it('should create src content files', () => {

    assert.file('src/js/export.js');
    assert.file(`src/js/components/${promtArgs.reactComponent}.js`);
    assert.file('src/scss/styles.scss');
  });
});
