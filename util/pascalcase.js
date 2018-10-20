const flow = require("lodash/flow");
const camelCase = require("lodash/camelCase");
const upperFirst = require("lodash/upperFirst");

module.exports = flow(
  camelCase,
  upperFirst
);
