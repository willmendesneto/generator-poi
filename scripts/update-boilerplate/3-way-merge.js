const diff3 = require('node-diff3');
const fs = require('fs');
const { writeFileAndCreateDirectories } = require('../../util/safe-fs');

/* eslint-disable */
// Clone of merge function from diff3 but changes the conflict line styles
function merge(a, o, b) {
  var merger = diff3.diff.diff3Merge(a, o, b, true);
  var conflict = false;
  var lines = [];
  for (var i = 0; i < merger.length; i++) {
    var item = merger[i];
    if (item.ok) {
      lines = lines.concat(item.ok);
    } else {
      conflict = true;
      lines = lines.concat(
        ["<<<<<<<<<"],
        item.conflict.a,
        ["========="],
        item.conflict.b,
        [">>>>>>>>>"]
      );
    }
  }
  return {"conflict": conflict, "result": lines};
}
/* eslint-enable */

function mergeFiles(fileA, fileO, fileB) {
  return merge(fileA.split('\n'), fileO.split('\n'), fileB.split('\n')).result.join('\n');
}

function mergeFileIfExists(path, fileOriginal, fileB) {
  if (fs.existsSync(path)) {
    const fileA = fs.readFileSync(path, 'utf8');
    const merges = mergeFiles(fileA, fileOriginal, fileB);
    fs.writeFileSync(path, merges, 'utf8');
  } else {
    writeFileAndCreateDirectories(path, fileB);
  }
}

module.exports = {
  mergeFiles,
  mergeFileIfExists,
};
