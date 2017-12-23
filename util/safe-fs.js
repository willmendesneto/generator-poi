const fs = require('fs');
const mkdirp = require('mkdirp');
const upath = require('upath');

module.exports = {
  writeFileAndCreateDirectories: (path, file) => {
    // Make sure the directories exist before creating the file
    mkdirp(upath.dirname(path), () => {
      fs.writeFileSync(path, file, 'utf8');
    });
  },

  removeFileAndEmptyDir: (filePath) => {
    fs.unlink(filePath);
    let folder = upath.dirname(filePath);
    while (fs.readdirSync(folder).length === 0) {
      fs.rmdirSync(folder);
      folder = upath.parse(folder).dir;
    }
  },
};
