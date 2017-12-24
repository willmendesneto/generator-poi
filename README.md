# PoiJS -  Yeoman generator 

This is a yo generator for building domain react frontend components. Install it, run it and start building components!

For information on the project it generates, see _[About This
Project](/app/templates/README.md#about-this-project)_.

## How to use

[Make sure you are using `npm@>=5.2.0`](https://docs.npmjs.com/getting-started/installing-node)

```
mkdir co-my-component && cd co-my-component
npx -p yo -p generator-poi -c 'yo poi-boilerplate'
```

_[`yarn` failing?](#yarn-failing)_

Then answer the questions truthfully (_it'll know if you're lying_)

### update-boilerplate

generator-poi provides a script `update-boilerplate` to help update repositories built with generator-poi
to the latest version.

#### Setup
In order to use update-boilerplate you'll need to
[create a personal access token](https://github.com/settings/tokens)
which has permissions to read private repositories:

![Token permissions](./assets/token.png)

Then, set the environment variable `GITHUB_DIFF_TOKEN` to the token you've just created

You can run the following in the command line or add it your `.bashrc`

```bash
export GITHUB_DIFF_TOKEN=token
```

#### Run update-boilerplate

Make sure you have `npm@>=5.2.0`:

```
npm install -g npm@latest
```

Inside the existing boilerplate generated repository run:

```
npx -p willmendesneto/generator-poi -c update-boilerplate
```

update-boilerplate will apply the changes from the latest version of boilerplate as a git style merge - so you'll still need to manually fix conflicts.

## Editing the generator

To create a template file whos filename is replaced by one of the user-entered
variables, use the delimiters `_-` and `-_` instead of the ejs style `<%` and
`%>` (`<` and `>` are not allowed on Windows).

## Code architecture


Here is a selection of the interesting parts:

<pre>
.
├── <a href="#nvmrc" title=".nvmrc file">.nvmrc</a>
├── <a href="#editorconfig" title=".editorconfig file">.editorconfig</a>
├── <a href="#changelog" title="changelog file">CHANGELOG.md</a>
├── src
│   ├── js
│   |   ├── <a href="#srccomponents" title="Description of components folder">components</a>
│   │   │   ├── <a href="#srcjscomponentscomponent-namejs" title="Description of component-name.js">component-name.js</a>
│   ├── scss
│   │   └── styles.scss
│   ├── <a href="#srcjsexportjs" title="Description of export.js">export.js</a>
└── test
    └── <a href="#testjs" title="Description of test files">*.js</a>
</pre>

#### `CHANGELOG.md`

> The purpose of a commit is to document one atomic step in the process by which
> the code evolves from one state to another.
> The purpose of a change log is to document the noteworthy differences between
> these states.

> As is the difference between good comments and the code itself,
> so is the difference between a change log and the commit log:
> one describes the why,
> the other the how.

- _[keepachangelog.com](http://keepachangelog.com/)_

Keep a log of the significant changes in this file under the `Unreleased`
heading,
and tooling will ensure it's versioned.

#### `src/js/components/component-name.js`

This is the main component of this module. If your module exports multiple
components, edit a copy of this file, and add that export to `export.js`.

#### `src/js/export.js`

This is the export of the module. Usually is a simple import/export to
expose any components this module may contain.

#### `src/scss/`

Contains all the style info for this component.

`styles.scss` is the entry point for the main stylesheet associated with this
component. This entry point is the equivalent to both the `export.js` and
`index.js` but for styles, rolled into one (due to the way sass works).

Styling is split up into _helpers_, and logical groupings, where each grouping
has their own _structure_, and _state_:

```
└── scss
    ├── styles.scss
    ├── _variables.scss (or _mixins.scss or other "helpers")
    ├── some-grouping
    │   ├── _some-grouping-structure.scss
    │   └── _some-grouping-state.scss
    └── another-group
        ├── _another-group-structure.scss
        └── _another-group-state.scss
```

The groupings follow the naming pattern:

`-structure.scss`: The BEM named styles that setup the base visuals for the
component.
`-state.scss`: For classes that are used when states change within the
component (eg; `.is-selected`, `.is-active`, etc).

The _helpers_ are the things which don't really fall into the groupings.


#### `test/*.js`

Start writing your tests here. You can make multiple files in this folder, and
they will all be executed.


### `yarn` failing?

Make sure you're on the [latest version of `yarn`](https://yarnpkg.com/en/docs/install).

You may be seeing a 404 error, something along the lines of:

```
error An unexpected error occurred: "https://registry.yarnpkg.com/@{ORG}/{PACKAGE}/-/{PACKAGE}-1.0.0.tgz: Request failed \"404 Not Found\"".
```

Try out [these steps](https://github.com/yarnpkg/yarn/issues/521#issuecomment-280565157) to fix things:

```shell
npm logout
yarn logout

mv ~/.npmrc ~/.npmrc.bak
mv ~/.yarnrc ~/.yarnrc.bak

npm login
yarn login
```

## Code Coverage

The [nyc](https://github.com/istanbuljs/nyc) command-line-client for Istanbul has been setup.
It will run by default while running tests but minimum coverage is not enforced (as it defaults to 0).
You can also see full html coverage reports by running:

```shell
yarn run coverage
or
npm run coverage
```

To enforce coverage on the component, edit the `nyc` section in the `package.json` file
and include the minimum `lines`, `statements`, `functions` and `branches` values.
See [Configuring nyc](https://github.com/istanbuljs/nyc#configuring-nyc) for more info.

## Changes

See [CHANGELOG.md](./CHANGELOG.md).
