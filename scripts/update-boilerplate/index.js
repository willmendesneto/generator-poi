#! /usr/bin/env node
const githubDiff = require('github-diff');
const fs = require('fs');
const ejs = require('ejs');
const upath = require('upath');
const cloneDeep = require('lodash/cloneDeep');
const { mergeFiles, mergeFileIfExists } = require('./3-way-merge');
const { isEjsTemplate } = require('../../util/ejs-util');
const { writeFileAndCreateDirectories, removeFileAndEmptyDir } = require('../../util/safe-fs');
const { isYeomanTemplate, makeProps, renderBoilerplateFilename } = require('./util');
const generatorPackageJson = require('../../package.json');

const projectPackageJsonPath = upath.join(process.cwd(), 'package.json');
const projectPackageJson = JSON.parse(fs.readFileSync(projectPackageJsonPath, 'utf8'));
const oldGeneratorVersion = projectPackageJson.generatorVersion;
const newGeneratorVersion = generatorPackageJson.version;

const props = makeProps(projectPackageJson);

function printFileChangeMessage(fileStatus, filename) {
  // eslint-disable-next-line no-console
  console.log(`${fileStatus} - ${filename}`);
}

function renderBoilerplatePath(filename) {
  return upath.join(process.cwd(), renderBoilerplateFilename(filename, props));
}

function updateGeneratorVersion() {
  const newPackageJson = cloneDeep(projectPackageJson);
  newPackageJson.generatorVersion = newGeneratorVersion;
  fs.writeFileSync(projectPackageJsonPath, JSON.stringify(newPackageJson, null, 2), 'utf8');
}

// Update the generatorVersion. If package.json hasn't changed between boilerplate versions this must be done manually
updateGeneratorVersion();

githubDiff(
  'willmendesneto/generator-poi',
  `v${oldGeneratorVersion}`,
  `v${newGeneratorVersion}`
).then((patches) => {
  const files = patches.filter(file => isYeomanTemplate(file.filename));
  const ejsFiles = files.filter(file => isEjsTemplate(file.filename, props));
  const ejsConflicts = {};

  // Check for naming conflicts with filenames that have ejs templates
  // For example, github would mark a rename from `<%component%>.js` to `0_-component-_0.js
  // as an added and deleted file, even though ejs renders them to the same filename
  ejsFiles.forEach((ejsFile) => {
    const renderedNameA = renderBoilerplatePath(ejsFile.filename);

    if (renderedNameA in ejsConflicts) {
      // We already found all the copies with this name so don't add it again
      return;
    }

    ejsFiles.forEach((file) => {
      if (ejsFile.filename === file.filename) {
        return;
      }

      const renderedNameB = renderBoilerplatePath(file.filename);

      if (renderedNameA === renderedNameB) {
        if (ejsConflicts[renderedNameA]) {
          ejsConflicts[renderedNameA].push(file);
        } else {
          ejsConflicts[renderedNameA] = [ejsFile, file];
        }
      }
    });
  });

  Object.keys(ejsConflicts).forEach((key) => {
    // Apply patches specially for ejsConflicts
    const conflictFiles = ejsConflicts[key];

    if (conflictFiles.length !== 2) {
      // We should never end up with more than 2 ejs templates that render to the same name
      // as that implies that they'll render to the same name
      const filenames = [];

      conflictFiles.forEach((file) => {
        filenames.push(`${file.filename} - ${file.status}`);
      });

      // eslint-disable-next-line no-console
      console.error(
        'Unexpected diff. ' +
        `Found more than 2 files with the same ejs rendered filename: ${filenames.join(', ')}`
      );
      process.exit(1);
    }

    let fileOriginal;
    let fileB;

    // If there are EJS conflicts, then only the following status pairs are possible:
    // removed + added, removed + renamed
    // In both cases, instead of treating them as 2 seperate operations, we want to treat
    // them as a merge instead
    if (conflictFiles[0].status === 'removed') {
      fileOriginal = ejs.render(conflictFiles[0].fileA, props);
      fileB = ejs.render(conflictFiles[1].fileB, props);
    } else {
      fileOriginal = ejs.render(conflictFiles[1].fileA, props);
      fileB = ejs.render(conflictFiles[0].fileB, props);
    }

    const localFile = renderBoilerplatePath(conflictFiles[0].filename);

    printFileChangeMessage('modified', renderBoilerplateFilename(conflictFiles[0].filename, props));

    mergeFileIfExists(localFile, fileOriginal, fileB);
  });

  // Run the normal files through a patch system
  files.forEach((patch) => {
    const localFile = renderBoilerplatePath(patch.filename);

    if (localFile in ejsConflicts) {
      return;
    }

    // Get the file contents and run through ejs
    const fileB = patch.fileB && ejs.render(patch.fileB, props);
    const fileOriginal = patch.fileA && ejs.render(patch.fileA, props);

    printFileChangeMessage(patch.status, renderBoilerplateFilename(patch.filename, props));
    // Handle errors and display information
    // Make async
    switch (patch.status) {
      case 'removed':
        if (fs.existsSync(localFile)) {
          removeFileAndEmptyDir(localFile);
        }
        break;
      case 'added':
        // If the file doesn't already exist create a patch (we fake it with a 3 way merge from an empty string)
        mergeFileIfExists(localFile, '', fileB);
        break;
      case 'modified':
        mergeFileIfExists(localFile, fileOriginal, fileB);
        break;
      case 'renamed': {
        const oldFile = renderBoilerplatePath(patch.previousFilename);
        if (fs.existsSync(localFile)) {
          // If file was renamed, and the new filename already exists, consider it a merge with the new filename
          const fileA = fs.readFileSync(localFile, 'utf8');
          const merge = mergeFiles(fileA, fileOriginal, fileB);
          fs.writeFileSync(localFile, merge, 'utf8');
        } else if (fs.existsSync(oldFile)) {
          // Else if only the old filename exists, merge with the old file and move it to the new filename
          const fileA = fs.readFileSync(oldFile, 'utf8');
          const merge = mergeFiles(fileA, fileOriginal, fileB);
          writeFileAndCreateDirectories(localFile, merge);
          removeFileAndEmptyDir(oldFile);
        } else {
          // Otherwise just create the renamed file
          writeFileAndCreateDirectories(localFile, fileB);
        }
        break;
      }
      default:
        // eslint-disable-next-line no-console
        console.log('unhandled case');
    }
  });
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.log(err);
});
