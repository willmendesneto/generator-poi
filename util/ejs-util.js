const ejs = require('ejs');

const FILE_DELIM_OPEN = '0_-';
const FILE_DELIM_CLOSE = '-_0';

module.exports = {
  FILE_DELIM_OPEN,
  FILE_DELIM_CLOSE,

  isEjsTemplate: (filename, props) => {
    const ejsFilename = filename
      .replace(FILE_DELIM_OPEN, '<%')
      .replace(FILE_DELIM_CLOSE, '%>');
    return ejsFilename !== ejs.render(ejsFilename, props);
  },
};
