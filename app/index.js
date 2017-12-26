/* eslint-disable no-underscore-dangle */
// yeoman expects underscore dangles for private methods
const yeoman = require('yeoman-generator');
const spawn = require('cross-spawn');
const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const cloneDeep = require('lodash/cloneDeep');
const mkdirp = require('mkdirp');
const chalk = require('chalk');
const commandExists = require('command-exists');
const findParentDir = require('find-parent-dir');
const generatorPackageJson = require('../package.json');
const pascalcase = require('../util/pascalcase');
const { FILE_DELIM_OPEN, FILE_DELIM_CLOSE } = require('../util/ejs-util');

const generatorVersion = generatorPackageJson.version;

module.exports = yeoman.extend({

  _customAppName() {
    const privateNpmRepository = /@.*\/(.*)/;
    let appname = this._getPackageProp('name');
    let match;

    if (appname && appname.match(privateNpmRepository)) {
      match = privateNpmRepository.exec(appname);
      appname = match[1];
    }

    if (!appname) {
      appname = path.basename(this.destinationRoot());
    }

    return appname;
  },

  _packageAuthor() {
    let user = '';
    if (this.user.git.name()) {
      user += this.user.git.name();
      if (this.user.git.email()) {
        user += ` <${this.user.git.email()}>`;
      }
    }
    return user;
  },

  _getPackageProp(property) {
    return this.fs.readJSON(this.destinationPath('package.json'), {})[property];
  },

  _projectHasParentFolder(folder) {
    let gitDir = null;
    try {
      gitDir = findParentDir.sync(process.cwd(), folder);
    } catch (error) {
      gitDir = null;
    }

    return !!gitDir;
  },

  _runGitInitCommand() {
    if (this._projectHasParentFolder('.git')) {
      console.log(`Skipping git initialization. .git folder found in parent directory [${gitDir}]`);
      return;
    }

    spawn.sync('git', ['init'], { stdio: 'inherit' });
    spawn.sync('git', ['add', '-A'], { stdio: 'inherit' });
    spawn.sync('git', [
      'commit',
      '-am',
      `"Initial commit from ${generatorPackageJson.name}@${generatorPackageJson.version}"`,
    ], { stdio: 'inherit' });

  },

  _checkForNPM() {
    if (!commandExists.sync('npm')) {
      // Hard fail without npm.
      this.env.error(chalk.bold.red('Error: Components require NPM.\nInstallation: https://www.npmjs.com/get-npm'));
      return;
    }
  },

  initializing() {
    this._checkForNPM();
    this.appname = this._customAppName();
  },

  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'reactComponent',
        message: 'Your component name.',
        store: true,
        default: this.appname,
      },
      {
        type: 'input',
        name: 'description',
        message: 'Write a brief description for your component?',
        store: true,
        default: 'No description provided'
      },
      {
        type: 'input',
        name: 'author',
        message: 'What is your name?',
        store: true,
        default: this._packageAuthor(),
      },
      {
        type: 'confirm',
        name: 'autoLoad',
        message: 'Auto load the component demo URL after generation?',
        store: true,
        default: true,
      },
    ];

    return this.prompt(prompts).then((props) => {
      const newProps = cloneDeep(props);
      newProps.reactComponent = props.reactComponent;
      newProps.component = props.reactComponent;
      newProps.componentCC = pascalcase(newProps.component);
      newProps.generatorVersion = generatorVersion;
      this.props = newProps;
    });
  },

  writing() {
    // gitignore needs to be copied to .gitignore
    // We can't have .gitignore in the templates folder because
    // npm decides to do some magic and doesn't publish it
    const dotFileGlob = '{git,npm}ignore';
    // eslint-disable-next-line prefer-template
    const namedTemplateGlob = './**/*' + FILE_DELIM_OPEN + '*' + FILE_DELIM_CLOSE + '*';
    const templates = glob.sync('./**/*', {
      cwd: this.sourceRoot(),
      nodir: true,
      dot: true,
      ignore: [
        // eslint-disable-next-line prefer-template
        './**/' + dotFileGlob,
        namedTemplateGlob,
        './**/node_shrinkwrap/**/*',
      ],
    });
    const dirs = glob.sync('./**/*/', {
      cwd: this.sourceRoot(),
      dot: true,
    });
    const dotTemplates = glob.sync(dotFileGlob, {
      cwd: this.sourceRoot(),
      dot: true,
    });
    const namedTemplates = glob.sync(namedTemplateGlob, {
      cwd: this.sourceRoot(),
      dot: true,
    });

    dirs.forEach((file) => {
      mkdirp(this.destinationPath(file));
    });

    templates.forEach((file) => {
      const renderedFile = ejs.render(file, this.props);
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(renderedFile),
        this.props
      );
    });

    dotTemplates.forEach((file) => {
      const renderedFile = ejs.render(file, this.props);
      this.fs.copyTpl(
        this.templatePath(file),
        // eslint-disable-next-line prefer-template
        this.destinationPath('.' + renderedFile),
        this.props
      );
    });

    namedTemplates.forEach((file) => {
      const ejsFile = file
        .replace(FILE_DELIM_OPEN, '<%')
        .replace(FILE_DELIM_CLOSE, '%>');
      const renderedFile = ejs.render(ejsFile, this.props);
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(renderedFile),
        this.props
      );
    });
  },

  install() {
    this._useSpecifiedNodeVersion()
    this.installDependencies({ bower: false, npm: true, yarn: false });
  },

  _useSpecifiedNodeVersion() {
    // TO-DO:
    // Add integration with other Node Version Managers, such as N, for example
    if (!commandExists.sync('nvm')) {
      console.log(chalk.bold.blue('Info: NVM not installed. Bypassing setup based on specified NodeJS version'));
      return;
    }

    try {
      const nvmrcNodeVersion = fs.readFileSync(`${process.cwd()}/.nvmrc`);

      spawn.sync('nvm', ['install', nvmrcNodeVersion], { stdio: 'inherit' });
      spawn.sync('nvm', ['use', nvmrcNodeVersion], { stdio: 'inherit' });
      spawn.sync('nvm', ['alias', 'default', nvmrcNodeVersion], { stdio: 'inherit' });

      console.log(chalk.green(`Using NodeJS 'v${nvmrcNodeVersion}' as default NodeJS version`));
    } catch (error) {
      this.env.error(chalk.bold.red('Error when tried to use specified NodeJS version.', error));
    }
    
  },

  end() {
    // Callback to squelch error messages from symlink already created
    // fs.symlink(
    //   'node_modules/yourmodule/yourfile',
    //   this.destinationPath('.yourfile'),
    //   () => {}
    // );

    this._runGitInitCommand();

    console.log(chalk.green.bold('\n\n🎉 Success 🎉')); // eslint-disable-line no-console

    if (this.props.autoLoad) {
      spawn('npm', ['start'], { stdio: 'inherit' });
    } else {
      console.log(chalk.green.bold(`

Get started:
- npm start
- visit http://localhost:4000

If you want to more about the available commands read your 'README.md' or use 'npm run-script' in your terminal
      `));
    }
  },
});
