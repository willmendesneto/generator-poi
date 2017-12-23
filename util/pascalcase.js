const { flow, camelCase, upperFirst } = require('lodash');

module.exports = flow(camelCase, upperFirst);
