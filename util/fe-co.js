const componentPrefixRe = /^(fe-co-(.*))|(fe-pa-(.*))/;

module.exports = {
  // Takes a string and adds fe-co to the front if it doesn't already start with fe-co/fe-pa
  feCoize: (string) => {
    if (string.match(componentPrefixRe)) {
      return string;
    }
    return `fe-co-${string}`;
  },

  // Takes a string and removes fe-co/fe-pa from the front if it starts with it
  unFeCoize: (string) => {
    if (string.match(componentPrefixRe)) {
      return componentPrefixRe.exec(string)
        // drop the first element
        .splice(1)
        // Only take every second element (the matched regex subgroup)
        .filter((value, key) => (key % 2 === 1))
        // Filter out any undefined elements (when there's no match)
        // And take the first one that matches
        .filter(value => (!!value))[0];
    }
    return string;
  },
};
