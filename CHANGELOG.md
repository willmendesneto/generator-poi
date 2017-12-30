# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][]

## [2.2.10][] - 2017-12-29
## Fixes
- Removing `files` information on `app/templates/package.json` to avoid npm issue when publishing package. When the package was published for some reason NPM was reading both `package.json#files` information and the publish was broken

## [2.2.9][] - 2017-12-28
## Chore
- Adding MIT license
- Updating `.gitignore` file

## [2.2.8][] - 2017-12-28
## Chore
- Updating `package-lock.json` file

## [2.2.7][] - 2017-12-28
## Fixed
- Adding `files` field in `package.json`

## [2.2.6][] - 2017-12-28
## Fixed 
- Cleaning up npmignore and gitignore

## [2.2.4][] - 2017-12-28
## Fixed
- Removing ignored files

## [2.2.3][] - 2017-12-28
## Fixed 
- Writing files directly using `forEach`

## [2.2.3-0][] - 2017-12-28
## Fixed
- Writing files using `for` instead of `forEach`

## [2.2.2][] - 2017-12-28
## Fixed
- using `npmignore` without dot

## [2.2.1][] - 2017-12-28
## Fixed
- Keep the install flow if `.nvmrc` is not available

## [2.2.0][] - 2017-12-27
## Fixed
- Fixing `npm run build:page` command

## Tests
- Increasing code coverage

### Added
- Bumping `generator-poi-boilerplate-demo` to `1.2.0`
- Adding tests for new template files
- using and installing NodeJS version via NVM
- Increasing code coverage on templates
- Using and installing NodeJS version via NVM
- Tests for new template files

## [2.1.1][] - 2017-12-26
### Added
- Adding `update-yeoman-generator` integration
- Removing repository prefix

## [2.1.0][] - 2017-12-25
### Added
- Adding `storybook` addons

## [2.0.1][] - 2017-12-25
### Fixed
- Adding `generator-poi-boilerplate-demo` component as dev dependency with how to start message

## [2.0.0][] - 2017-12-25

### Added
- Adding `react-storybook` as demo wrapper

## [1.0.1][] - 2017-12-24

### Added
- Created `generator-poi` project


[Unreleased]: https://github.com/willmendesneto/generator-poi-boilerplate/compare/v2.2.10...HEAD
[2.2.10]: https://github.com/willmendesneto/generator-poi-boilerplate/compare/v2.2.9...v2.2.10
[2.2.9]: https://github.com/willmendesneto/generator-poi-boilerplate/compare/v2.2.8...v2.2.9
[2.2.8]: https://github.com/willmendesneto/generator-poi-boilerplate/compare/v2.2.7...v2.2.8
[2.2.7]: https://github.com/willmendesneto/generator-poi-boilerplate/compare/v2.2.6...v2.2.7
[2.2.6]: https://github.com/willmendesneto/generator-poi-boilerplate/compare/v2.2.4...v2.2.6
[2.2.4]: https://github.com/willmendesneto/generator-poi-boilerplate/compare/v2.2.3...v2.2.4
[2.2.3]: https://github.com/willmendesneto/generator-poi-boilerplate/compare/v2.2.3-0...v2.2.3
[2.2.3-0]: https://github.com/willmendesneto/generator-poi-boilerplate/compare/v2.2.2...v2.2.3-0
[2.2.2]: https://github.com/willmendesneto/generator-poi-boilerplate/compare/v2.2.1...v2.2.2
[2.2.1]: https://github.com/willmendesneto/generator-poi-boilerplate/compare/v2.2.0...v2.2.1
[2.2.0]: https://github.com/willmendesneto/generator-poi-boilerplate/compare/v2.1.1...v2.2.0
[2.1.1]: https://github.com/willmendesneto/generator-poi-boilerplate/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/willmendesneto/generator-poi-boilerplate/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/willmendesneto/generator-poi-boilerplate/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/willmendesneto/generator-poi-boilerplate/compare/v1.0.1...v2.0.0
[1.0.1]: https://github.com/willmendesneto/generator-poi-boilerplate/tree/v1.0.1